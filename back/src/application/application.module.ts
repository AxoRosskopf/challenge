import { Module } from "@nestjs/common";
import { NeighborhoodUseCases } from "./usecases/neighborhood";
import { PropertyUseCases } from "./usecases/properties";
import { PropertyFactory } from "./factory/property.factory";
import { NeighborhoodFactory } from "./factory/neighborhood.factory";
import { StatisticsUseCases } from "./usecases/statistics";

@Module({
    providers: [
        ...StatisticsUseCases,
        ...NeighborhoodUseCases,
        ...PropertyUseCases,
        PropertyFactory,
        NeighborhoodFactory
    ],
    exports: [
        ...StatisticsUseCases,
        ...NeighborhoodUseCases,
        ...PropertyUseCases,
        PropertyFactory,
        NeighborhoodFactory
    ]
})
export class ApplicationModule { }