import NeighborhoodModel from "src/domain/models/neighborhood.model";
import { NeighborhoodEntity } from "../adapters/repository/neighborhoods/entity/neighborhoods.entity";
import NullValueException from "../exceptions/null-value-exception";

export default class NeighborhoodMapper {
    public static toDomain(neighborhoodEntity: NeighborhoodEntity): NeighborhoodModel {
        if (!neighborhoodEntity) {
            throw new NullValueException();
        }
        return new NeighborhoodModel(
            neighborhoodEntity.id,
            neighborhoodEntity.name,
            neighborhoodEntity.geometry
        );
    }
    public static toPersistence(neighborhoodModel: NeighborhoodModel): NeighborhoodEntity {
        const entity = new NeighborhoodEntity();
        entity.id = neighborhoodModel.getId();
        entity.name = neighborhoodModel.getName();
        entity.geometry = neighborhoodModel.getGeometry();
        return entity;
    }
}