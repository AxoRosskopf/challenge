import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";
import { NeighborhoodEntity } from "./entity/neighborhoods.entity";
import { Repository } from "typeorm";
import NeighborhoodModel from "src/domain/models/neighborhood.model";
import NeighborhoodMapper from "src/infrastructure/mapper/neighborhood.mapper";

@Injectable()
export class NeighborhoodRepositoryPostgres implements INeighborhoodRepository {
    constructor(
        @InjectRepository(NeighborhoodEntity)
        private readonly repository: Repository<NeighborhoodEntity>,
    ) { }

    async getAllNeighborhoods(): Promise<NeighborhoodModel[]> {
        const entities = await this.repository.find();
        return entities.map(entity => NeighborhoodMapper.toDomain(entity))
            .filter((items): items is NeighborhoodModel => items !== null);
    }

    async getNeighborhoodByName(name: string): Promise<NeighborhoodModel | null> {
        const entity = await this.repository.findOne({ where: { name: name.toLowerCase() } });
        return entity ? NeighborhoodMapper.toDomain(entity) : null;
    }

    async getNeighborhoodById(id: string): Promise<NeighborhoodModel | null> {
        const entity = await this.repository.findOne({ where: { id } });
        return entity ? NeighborhoodMapper.toDomain(entity) : null;
    }

    async saveAll(neighborhoods: NeighborhoodModel[]): Promise<void> {
        const entities = neighborhoods.map(
            neighborhood => NeighborhoodMapper.toPersistence(neighborhood)
        );
        await this.repository.save(entities);
    }
}