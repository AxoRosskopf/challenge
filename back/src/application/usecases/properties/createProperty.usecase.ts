import { Injectable } from "@nestjs/common";
import { IPropertyRepository } from "src/domain/ports/property.repository";
import PropertyModel from "src/domain/models/property.model";
import CreatePropertyCommand from "src/application/command/property.command";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";
import { PropertyFactory } from "src/application/factory/property.factory";

@Injectable()
export default class CreatePropertyUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository,
        private readonly neighborhoodRepository: INeighborhoodRepository,
        private readonly propertyFactory: PropertyFactory
    ) { }

    public async handler(command: CreatePropertyCommand) {
        const neighborhood = await this.neighborhoodRepository
            .getNeighborhoodByName(command.neighborhoodName);

        if (!neighborhood) {
            throw new Error('Neighborhood not found');
        }
        const propertyModel = this.propertyFactory.create(command, neighborhood);
        await this.propertyRepository.createProperty(propertyModel);
        return propertyModel;
    }
}       