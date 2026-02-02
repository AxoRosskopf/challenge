import { Injectable } from "@nestjs/common";
import CreatePropertyCommand from "src/application/command/property.command";
import { PropertyFactory } from "src/application/factory/property.factory";
import { IPropertyRepository } from "src/domain/ports/property.repository";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";
import PropertyModel from "src/domain/models/property.model";

@Injectable()
export default class UploadDataUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository,
        private readonly propertyFactory: PropertyFactory,
        private readonly neighborhoodRepository: INeighborhoodRepository
    ) { }

    async execute(data: any[]): Promise<void> {
        const propertiesToSave: PropertyModel[] = [];
        for (const item of data) {
            const neighborhood = await this.neighborhoodRepository.getNeighborhoodByName(item.neighborhood);
            if (!neighborhood) {
                console.warn(`Neighborhood ${item.neighborhood} not found, skipping property.`);
                continue;
            }
            const command = new CreatePropertyCommand(
                item.address,
                item.neighborhood,
                item.type,
                Number(item.rooms),
                Number(item.totalSurface),
                Number(item.coveredSurface),
                Number(item.price),
                Number(item.constructionYear)
            )
            const propertyModel = this.propertyFactory.create(command, neighborhood);
            propertiesToSave.push(propertyModel);
        }
        if (propertiesToSave.length > 0) {
            await this.propertyRepository.saveAll(propertiesToSave);
        }
    }
}