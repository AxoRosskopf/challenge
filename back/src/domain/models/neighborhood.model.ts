import { ApiProperty } from "@nestjs/swagger";

export class GeoJSON {
    @ApiProperty({ example: 'Point' })
    type: string;

    @ApiProperty({ example: [-58.4239, -34.5711] })
    coordinates: any;
}

export default class NeighborhoodModel {
    @ApiProperty({ example: 'uuid-123' })
    private id: string;

    @ApiProperty({ example: 'Palermo' })
    private name: string;

    @ApiProperty({ type: GeoJSON })
    private geometry: GeoJSON;

    constructor(id: string, name: string, geometry: GeoJSON) {
        this.id = id;
        this.name = name;
        this.geometry = geometry;
    }
    public getId(): string {
        return this.id;
    }
    public getName(): string {
        return this.name;
    }
    public getGeometry(): GeoJSON {
        return this.geometry;
    }
}