import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from 'uuid';
import CreateNeighborhoodCommand from "../command/neighborhood.command";
import NeighborhoodModel from "src/domain/models/neighborhood.model";

@Injectable()
export class NeighborhoodFactory {
    public create(command: CreateNeighborhoodCommand): NeighborhoodModel {
        return new NeighborhoodModel(
            uuidv4(),
            command.name,
            command.geometry
        );
    }
}