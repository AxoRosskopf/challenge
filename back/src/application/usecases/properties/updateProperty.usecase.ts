import { Injectable } from "@nestjs/common";
import { IPropertyRepository } from "src/domain/ports/property.repository";
import PropertyModel from "src/domain/models/property.model";

@Injectable()
export default class UpdatePropertyUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    public async handler(id: string, property: PropertyModel) {
        return await this.propertyRepository.updateProperty(id, property);
    }
}   