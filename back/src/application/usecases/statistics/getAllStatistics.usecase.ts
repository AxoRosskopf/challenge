import { Injectable } from "@nestjs/common";
import { IStatisticsRepository } from "src/domain/ports/statistics.repository";

@Injectable()
export default class GetAllStatisticsUseCase {
    constructor(
        private readonly statisticsRepository: IStatisticsRepository
    ) { }

    public async handler() {
        return await this.statisticsRepository.getAllStatistics();
    }
}