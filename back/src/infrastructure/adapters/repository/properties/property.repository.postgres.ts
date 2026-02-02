import { Injectable } from "@nestjs/common";
import { IPropertyRepository, PaginatedProperties } from "src/domain/ports/property.repository";
import { PropertyEntity } from "./entity/property.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import PropertyMapper from "src/infrastructure/mapper/property.mapper";
import PropertyModel from "src/domain/models/property.model";

@Injectable()
export class PropertyRepositoryPostgres implements IPropertyRepository {
    constructor(
        @InjectRepository(PropertyEntity)
        private readonly repository: Repository<PropertyEntity>
    ) { }

    async getAllProperties(page: number, limit: number): Promise<PaginatedProperties> {
        const skip = (page - 1) * limit;
        const [entities, total] = await this.repository.findAndCount({
            relations: ['neighborhood'],
            skip,
            take: limit,
        })

        const totalPages = Math.ceil(total / limit);
        const data = entities.map(entity => PropertyMapper.toDomain(entity));

        return {
            data,
            total,
            page,
            limit,
            totalPages
        }
    }

    async getPropertyById(id: string): Promise<PropertyModel | null> {
        const entity = await this.repository.findOne({
            where: { id },
            relations: ['neighborhood']
        });
        return entity ? PropertyMapper.toDomain(entity) : null;
    }

    async createProperty(property: PropertyModel): Promise<void> {
        const entity = PropertyMapper.toPersistence(property);
        await this.repository.save(entity);
    }

    async updateProperty(id_property: string, property: PropertyModel): Promise<void> {
        const entity = PropertyMapper.toPersistence(property);
        await this.repository.update(id_property, entity);
    }

    async deleteProperty(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async saveAll(properties: PropertyModel[]): Promise<void> {
        const entities = properties.map(
            property => PropertyMapper.toPersistence(property)
        )
        await this.repository.save(entities)
    }

    async searchProperties(query: string, page: number, limit: number): Promise<PaginatedProperties> {
        const formattedQuery = query
            .trim()
            .split(/\s+/)
            .filter(word => word)
            .map(word => `${word}:*`)
            .join('&');

        if (!formattedQuery) {
            return {
                data: [],
                total: 0,
                page,
                limit,
                totalPages: 0
            }
        };

        const skip = (page - 1) * limit;

        const [entities, total] = await this.repository.createQueryBuilder('property')
            .leftJoinAndSelect('property.neighborhood', 'neighborhood')
            .where("property.search_vector @@ to_tsquery('spanish', :query)", { query: formattedQuery })
            .addSelect("ts_rank(property.search_vector, to_tsquery('spanish', :query))", "rank")
            .orderBy("rank", "DESC")
            .skip(skip)
            .take(limit)
            .getManyAndCount();

        const totalPages = Math.ceil(total / limit);
        const data = entities.map(entity => PropertyMapper.toDomain(entity))

        return {
            data,
            total,
            page,
            limit,
            totalPages
        }
    }
}