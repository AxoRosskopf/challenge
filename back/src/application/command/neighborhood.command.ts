import { GeoJSON } from "src/domain/models/neighborhood.model";

export default class CreateNeighborhoodCommand {
    constructor(
        public readonly name: string,
        public readonly geometry: GeoJSON
    ) { }
}