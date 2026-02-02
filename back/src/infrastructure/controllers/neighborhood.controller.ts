import { ApiOperation, ApiTags, ApiParam, ApiBody } from "@nestjs/swagger";
import { BadRequestException, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import GetAllNeighborhoodsUseCase from "src/application/usecases/neighborhood/getAllNeighborhoods.usecase";
import GetNeighborhoodByIdUseCase from "src/application/usecases/neighborhood/getNeighborhoodById.usecase";
import GetNeighborhoodByNameUseCase from "src/application/usecases/neighborhood/getNeighborhoodByName.usecase";
import UploadDataUseCase from "src/application/usecases/neighborhood/uploadData.usecase";

@ApiTags('neighborhoods')
@Controller('neighborhoods')
export default class NeighborhoodController {
    constructor(
        private readonly getAllNeighborhoodsUseCase: GetAllNeighborhoodsUseCase,
        private readonly getNeighborhoodByNameUseCase: GetNeighborhoodByNameUseCase,
        private readonly getNeighborhoodByIdUseCase: GetNeighborhoodByIdUseCase,
        private readonly uploadDataUseCase: UploadDataUseCase
    ) { }

    @ApiOperation({ summary: 'Get all neighborhoods' })
    @Get()
    public async getAllNeighborhoods() {
        return await this.getAllNeighborhoodsUseCase.handler();
    }

    @ApiOperation({ summary: 'Get neighborhood by name' })
    @ApiParam({ name: 'name', description: 'Neighborhood name' })
    @Get('name/:name')
    public async getNeighborhoodByName(@Param('name') name: string) {
        return await this.getNeighborhoodByNameUseCase.handler(name);
    }

    @ApiOperation({ summary: 'Get neighborhood by ID' })
    @ApiParam({ name: 'id', description: 'Neighborhood ID' })
    @Get(':id')
    public async getNeighborhoodById(@Param('id') id: string) {
        return await this.getNeighborhoodByIdUseCase.handler(id);
    }

    @ApiOperation({ summary: 'Upload neighborhoods from JSON' })
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
    public async uploadFile(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('File is required');
        }
        const jsonData = JSON.parse(file.buffer.toString('utf8'));
        await this.uploadDataUseCase.execute(jsonData);
        return { message: 'Data uploaded successfully' };
    }
}