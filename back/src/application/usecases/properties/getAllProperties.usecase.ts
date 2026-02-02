import { Injectable } from "@nestjs/common";
import { IPropertyRepository } from "src/domain/ports/property.repository";

@Injectable()
export default class GetAllPropertiesUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    public async handler(page: number, limit: number) {
        return await this.propertyRepository.getAllProperties(page, limit);
    }
}   