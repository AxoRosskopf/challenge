import { ApiOperation, ApiTags, ApiBody, ApiParam, ApiQuery, ApiResponse } from "@nestjs/swagger";
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import GetAllPropertiesUseCase from "src/application/usecases/properties/getAllProperties.usecase";
import GetPropertyByIdUseCase from "src/application/usecases/properties/getPropertyById.usecase";
import CreatePropertyUseCase from "src/application/usecases/properties/createProperty.usecase";
import UpdatePropertyUseCase from "src/application/usecases/properties/updateProperty.usecase";
import DeletePropertyUseCase from "src/application/usecases/properties/deleteProperty.usecase";
import CreatePropertyCommand from "src/application/command/property.command";
import { CreatePropertyDto } from "./DTO/createProperty.dto";
import GetNeighborhoodByNameUseCase from "src/application/usecases/neighborhood/getNeighborhoodByName.usecase";
import { PropertyFactory } from "src/application/factory/property.factory";
import { FileInterceptor } from "@nestjs/platform-express";
import { parse } from 'csv-parse/sync';
import UploadDataUseCase from "src/application/usecases/properties/uploadData.usecase";
import SearchPropertiesUseCase from "src/application/usecases/properties/searchProperties.usecase";
import { PaginationDto } from "./DTO/pagination.dto";

@ApiTags('properties')
@Controller('properties')
export default class PropertyController {
    constructor(
        private readonly propertyFactory: PropertyFactory,
        private readonly getAllPropertiesUseCase: GetAllPropertiesUseCase,
        private readonly getPropertyByIdUseCase: GetPropertyByIdUseCase,
        private readonly createPropertyUseCase: CreatePropertyUseCase,
        private readonly updatePropertyUseCase: UpdatePropertyUseCase,
        private readonly deletePropertyUseCase: DeletePropertyUseCase,
        private readonly getNeighborhoodByNameUseCase: GetNeighborhoodByNameUseCase,
        private readonly uploadDataUseCase: UploadDataUseCase,
        private readonly searchPropertiesUseCase: SearchPropertiesUseCase
    ) { }

    @ApiOperation({ summary: 'Search properties' })
    @ApiQuery({ name: 'q', required: true, description: 'Search term' })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @Get('search')
    public async searchProperties(
        @Query('q') query: string,
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10
    ) {
        return await this.searchPropertiesUseCase.execute(query, page, limit);
    }

    @ApiOperation({ summary: 'Get all properties with pagination' })
    @Get()
    public async getAllProperties(@Query() paginationDto: PaginationDto) {
        return await this.getAllPropertiesUseCase.handler(paginationDto.page, paginationDto.limit);
    }

    @ApiOperation({ summary: 'Get property by ID' })
    @ApiParam({ name: 'id', description: 'Property ID' })
    @Get(':id')
    public async getPropertyById(@Param('id') id: string) {
        return await this.getPropertyByIdUseCase.handler(id);
    }

    @ApiOperation({ summary: 'Create a new property' })
    @ApiBody({ type: CreatePropertyDto })
    @Post()
    public async createProperty(@Body() dto: CreatePropertyDto) {
        const command = new CreatePropertyCommand(
            dto.address,
            dto.neighborhoodName,
            dto.type,
            dto.rooms,
            dto.totalSurface,
            dto.coveredSurface,
            dto.price,
            dto.constructionYear
        );
        return await this.createPropertyUseCase.handler(command);
    }

    @ApiOperation({ summary: 'Update an existing property' })
    @ApiParam({ name: 'id', description: 'Property ID' })
    @ApiBody({ type: CreatePropertyDto })
    @Put(':id')
    public async updateProperty(@Param('id') id: string, @Body() dto: CreatePropertyDto) {
        const neighborhood = await this.getNeighborhoodByNameUseCase.handler(dto.neighborhoodName);
        if (!neighborhood) {
            throw new BadRequestException(`Neighborhood ${dto.neighborhoodName} not found`);
        }
        const command = new CreatePropertyCommand(
            dto.address,
            dto.neighborhoodName,
            dto.type,
            dto.rooms,
            dto.totalSurface,
            dto.coveredSurface,
            dto.price,
            dto.constructionYear
        );
        const propertyModel = this.propertyFactory.create(command, neighborhood!);
        return await this.updatePropertyUseCase.handler(id, propertyModel);
    }

    @ApiOperation({ summary: 'Delete a property' })
    @ApiParam({ name: 'id', description: 'Property ID' })
    @Delete(':id')
    public async deleteProperty(@Param('id') id: string) {
        return await this.deletePropertyUseCase.handler(id);
    }

    @ApiOperation({ summary: 'Upload properties from CSV or JSON' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadData(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        let data: any[] = [];
        const mimeType = file.mimetype;
        const originalName = file.originalname.toLowerCase();
        if (mimeType === 'application/json' || originalName.endsWith('.json')) {
            const jsonContent = JSON.parse(file.buffer.toString('utf8'));
            data = Array.isArray(jsonContent) ? jsonContent : (jsonContent.properties || []);
        } else if (mimeType === 'text/csv' || originalName.endsWith('.csv')) {
            const csvContent = file.buffer.toString('utf8');
            data = parse(csvContent, {
                columns: true,
                skip_empty_lines: true,
                cast: true,
                trim: true,
            })
        } else {
            throw new BadRequestException('Invalid file type');
        }
        await this.uploadDataUseCase.execute(data);
        return {
            message: 'Data uploaded successfully',
            count: data.length
        }
    }
}

