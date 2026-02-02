import { Injectable } from "@nestjs/common";
import { IPropertyRepository, PaginatedProperties } from "src/domain/ports/property.repository";

@Injectable()
export default class SearchPropertiesUseCase {
    constructor(
        private readonly propertyRepository: IPropertyRepository
    ) { }
    public async execute(query: string, page: number, limit: number): Promise<PaginatedProperties> {
        return await this.propertyRepository.searchProperties(query, page, limit);
    }
}