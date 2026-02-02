import { Injectable } from "@nestjs/common";
import NeighborhoodModel from "src/domain/models/neighborhood.model";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";
import { NeighborhoodFactory } from "../../factory/neighborhood.factory";
import CreateNeighborhoodCommand from "../../command/neighborhood.command";

@Injectable()
export default class UploadDataUseCase {
    constructor(
        private readonly neighborhoodRepository: INeighborhoodRepository,
        private readonly neighborhoodFactory: NeighborhoodFactory,
    ) { }

    async execute(jsonData: any): Promise<void> {
        const features = jsonData.features;
        if (!features || !Array.isArray(features)) {
            throw new Error('Invalid JSON data format')
        }
        const neighborhoods: NeighborhoodModel[] = features.map((feature: any) => {
            const properties = feature.properties;
            const geometry = feature.geometry;

            const command = new CreateNeighborhoodCommand(
                properties.BARRIO.toLowerCase(),
                geometry,
            );

            return this.neighborhoodFactory.create(command);
        })
        await this.neighborhoodRepository.saveAll(neighborhoods);
    }
}