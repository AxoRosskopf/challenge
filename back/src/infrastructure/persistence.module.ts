import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PropertyEntity } from "./adapters/repository/properties/entity/property.entity";
import { NeighborhoodEntity } from "./adapters/repository/neighborhoods/entity/neighborhoods.entity";
import { PropertyRepositoryPostgres } from "./adapters/repository/properties/property.repository.postgres";
import { NeighborhoodRepositoryPostgres } from "./adapters/repository/neighborhoods/neighborhood.repository.postgres";
import { IPropertyRepository } from "src/domain/ports/property.repository";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";
import { IStatisticsRepository } from "src/domain/ports/statistics.repository";
import { StatisticsRepositoryPostgres } from "./adapters/repository/statistics/statistics.repository.postgre";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature(
            [PropertyEntity, NeighborhoodEntity]
        )
    ],
    providers: [
        {
            provide: IPropertyRepository,
            useClass: PropertyRepositoryPostgres
        },
        {
            provide: INeighborhoodRepository,
            useClass: NeighborhoodRepositoryPostgres
        },
        {
            provide: IStatisticsRepository,
            useClass: StatisticsRepositoryPostgres
        }
    ],
    exports: [
        IPropertyRepository,
        INeighborhoodRepository,
        IStatisticsRepository
    ]
})
export class PersistenceModule { }
