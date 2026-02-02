import { StatisticsModel } from "../models/statistics.model";

export abstract class IStatisticsRepository {
    abstract getStatisticsByNeighborhood(nameNeighborhood: string): Promise<StatisticsModel>
    abstract getAllStatistics(): Promise<StatisticsModel[]>
}