import { Injectable } from "@nestjs/common";
import { IPropertyRepository } from "src/domain/ports/property.repository";

@Injectable()
export default class DeletePropertyUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }

    public async handler(id: string) {
        return await this.propertyRepository.deleteProperty(id);
    }
}       