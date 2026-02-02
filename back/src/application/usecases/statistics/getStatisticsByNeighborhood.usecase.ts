import { Injectable } from "@nestjs/common";
import { IStatisticsRepository } from "src/domain/ports/statistics.repository";

@Injectable()
export default class GetStatisticsByNeighborhoodUseCase {
    constructor(
        private readonly statisticsRepository: IStatisticsRepository

    ) { }

    public async handler(nameNeighborhood: string) {
        return await this.statisticsRepository.getStatisticsByNeighborhood(nameNeighborhood);
    }
}