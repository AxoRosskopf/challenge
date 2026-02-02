import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PropertyEntity } from "../properties/entity/property.entity";
import { IStatisticsRepository } from "src/domain/ports/statistics.repository";
import { StatisticsModel } from "src/domain/models/statistics.model";

@Injectable()
export class StatisticsRepositoryPostgres implements IStatisticsRepository {
    constructor(
        @InjectRepository(PropertyEntity)
        private readonly propertyRepository: Repository<PropertyEntity>
    ) { }

    async getAllStatistics(): Promise<StatisticsModel[]> {
        const result = await this.propertyRepository
            .createQueryBuilder('property')
            .leftJoin('property.neighborhood', 'neighborhood')
            .select('neighborhood.name', 'neighborhoodName')
            .addSelect('COUNT(property.id)', 'totalProperties')
            .addSelect('AVG(property.price)', 'averagePrice')
            .addSelect('STDDEV_SAMP(property.price)', 'standardDeviationPrice')
            .addSelect('AVG(property.price / property.totalSurface)', 'averagePricePerSquareMeter')
            .addSelect('STDDEV_SAMP(property.price / property.totalSurface)', 'standardDeviationPricePerSquareMeter')
            .addSelect("COUNT(CASE WHEN property.type = 'departamento' THEN 1 END)", 'totalApartments')
            .addSelect("COUNT(CASE WHEN property.type = 'casa' THEN 1 END)", 'totalHouses')
            .addSelect("COUNT(CASE WHEN property.type = 'PH' THEN 1 END)", 'totalPenthouses')
            .groupBy('neighborhood.name')
            .getRawMany()

        return result.map((row) => new StatisticsModel(
            row.neighborhoodName,
            Number(row.totalProperties),
            Number(row.averagePrice || 0),
            Number(row.standardDeviationPrice || 0),
            Number(row.averagePricePerSquareMeter || 0),
            Number(row.standardDeviationPricePerSquareMeter || 0),
            Number(row.totalApartments || 0),
            Number(row.totalHouses || 0),
            Number(row.totalPenthouses || 0)
        ))
    }

    async getStatisticsByNeighborhood(nameNeighborhood: string): Promise<StatisticsModel> {
        const result = await this.propertyRepository
            .createQueryBuilder('property')
            .leftJoin('property.neighborhood', 'neighborhood')
            .select('neighborhood.name', 'neighborhoodName')
            .addSelect('COUNT(property.id)', 'totalProperties')
            .addSelect('AVG(property.price)', 'averagePrice')
            .addSelect('STDDEV_SAMP(property.price)', 'standardDeviationPrice')
            .addSelect('AVG(property.price / property.totalSurface)', 'averagePricePerSquareMeter')
            .addSelect('STDDEV_SAMP(property.price / property.totalSurface)', 'standardDeviationPricePerSquareMeter')
            .addSelect("COUNT(CASE WHEN property.type = 'departamento' THEN 1 END)", 'totalApartments')
            .addSelect("COUNT(CASE WHEN property.type = 'casa' THEN 1 END)", 'totalHouses')
            .addSelect("COUNT(CASE WHEN property.type = 'PH' THEN 1 END)", 'totalPenthouses')
            .where('neighborhood.name = :nameNeighborhood', { nameNeighborhood })
            .groupBy('neighborhood.name')
            .getRawOne()

        return new StatisticsModel(
            result.neighborhoodName,
            Number(result.totalProperties),
            Number(result.averagePrice || 0),
            Number(result.standardDeviationPrice || 0),
            Number(result.averagePricePerSquareMeter || 0),
            Number(result.standardDeviationPricePerSquareMeter || 0),
            Number(result.totalApartments || 0),
            Number(result.totalHouses || 0),
            Number(result.totalPenthouses || 0)
        )
    }

}   