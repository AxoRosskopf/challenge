import PropertyModel from '../models/property.model';

export interface PaginatedProperties {
    data: PropertyModel[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export abstract class IPropertyRepository {
    abstract getAllProperties(page: number, limit: number): Promise<PaginatedProperties>;
    abstract getPropertyById(id: string): Promise<PropertyModel | null>;
    abstract createProperty(property: PropertyModel): Promise<void>;
    abstract updateProperty(id_property: string, property: PropertyModel): Promise<void>;
    abstract deleteProperty(id: string): Promise<void>;
    abstract saveAll(properties: PropertyModel[]): Promise<void>;
    abstract searchProperties(query: string, page: number, limit: number): Promise<PaginatedProperties>;
}