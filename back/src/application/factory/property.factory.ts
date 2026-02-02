import { Injectable } from "@nestjs/common";
import CreatePropertyCommand from "../command/property.command";
import PropertyModel from "src/domain/models/property.model";
import NeighborhoodModel from "src/domain/models/neighborhood.model";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PropertyFactory {
    public create(
        command: CreatePropertyCommand,
        neighborhood: NeighborhoodModel
    ): PropertyModel {
        return PropertyModel.create(
            uuidv4(),
            command.address,
            neighborhood,
            command.type,
            command.rooms,
            command.totalSurface,
            command.coveredSurface,
            command.price,
            command.constructionYear,
        )
    }
}