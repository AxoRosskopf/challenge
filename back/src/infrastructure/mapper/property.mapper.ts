import PropertyModel from "src/domain/models/property.model";
import { PropertyEntity } from "../adapters/repository/properties/entity/property.entity";
import NeighborhoodMapper from "./neighborhood.mapper";
import NullValueException from "../exceptions/null-value-exception";

export default class PropertyMapper {
    public static toDomain(propertyEntity: PropertyEntity): PropertyModel {
        if (!propertyEntity) {
            throw new NullValueException();
        }

        const neighborhood = propertyEntity.neighborhood ?
            NeighborhoodMapper.toDomain(propertyEntity.neighborhood) : null;

        return PropertyModel.reconstruct(
            propertyEntity.id,
            propertyEntity.address,
            neighborhood!,
            propertyEntity.type,
            propertyEntity.rooms,
            Number(propertyEntity.totalSurface),
            Number(propertyEntity.coveredSurface),
            Number(propertyEntity.price),
            propertyEntity.constructionYear,
            propertyEntity.createdAt,
            propertyEntity.updatedAt
        )
    }

    public static toPersistence(propertyModel: PropertyModel): PropertyEntity {
        const entity = new PropertyEntity();

        const primitives = propertyModel.toPrimitives();

        entity.id = primitives.id;
        entity.address = primitives.address;
        entity.type = primitives.type;
        entity.rooms = primitives.rooms;
        entity.totalSurface = primitives.totalSurface;
        entity.coveredSurface = primitives.coveredSurface;
        entity.price = primitives.price;
        entity.constructionYear = primitives.constructionYear;

        if (propertyModel.getNeighborhood()) {
            entity.neighborhood = NeighborhoodMapper.toPersistence(
                propertyModel.getNeighborhood());
        }

        entity.createdAt = primitives.createdAt;
        entity.updatedAt = primitives.updatedAt;
        return entity;

    }
}