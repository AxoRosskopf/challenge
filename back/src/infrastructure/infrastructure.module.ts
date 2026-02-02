import { Module } from "@nestjs/common";
import NeighborhoodController from "./controllers/neighborhood.controller";
import PropertyController from "./controllers/property.controller";
import { ApplicationModule } from "src/application/application.module";
import { PersistenceModule } from "./persistence.module";
import StatisticsController from "./controllers/statistics.controller";

@Module({
    imports: [
        PersistenceModule,
        ApplicationModule
    ],
    controllers: [
        StatisticsController,
        NeighborhoodController,
        PropertyController
    ]
})
export class InfrastructureModule { }