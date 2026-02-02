import { ApiOperation, ApiTags, ApiParam } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import GetAllStatisticsUseCase from "src/application/usecases/statistics/getAllStatistics.usecase";
import GetStatisticsByNeighborhoodUseCase from "src/application/usecases/statistics/getStatisticsByNeighborhood.usecase";

@ApiTags('statistics')
@Controller('statistics')
export default class StatisticsController {
    constructor(
        private readonly getAllStatisticsUseCase: GetAllStatisticsUseCase,
        private readonly getStatisticsByNeighborhoodUseCase: GetStatisticsByNeighborhoodUseCase,
    ) { }

    @ApiOperation({ summary: 'Get overall statistics' })
    @Get()
    public async getAllStatistics() {
        return await this.getAllStatisticsUseCase.handler();
    }

    @ApiOperation({ summary: 'Get statistics for a specific neighborhood' })
    @ApiParam({ name: 'name', description: 'Neighborhood name' })
    @Get(':name')
    public async getStatisticsByName(@Param('name') name: string) {
        return await this.getStatisticsByNeighborhoodUseCase.handler(name);
    }
}