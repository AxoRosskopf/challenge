import { ApiProperty } from "@nestjs/swagger";
import PriceBelowZeroException from "../exceptions/price-below-zero.exception";
import { typeProperty } from "./enums/property-type";
import NeighborhoodModel from "./neighborhood.model";

export default class PropertyModel {
    @ApiProperty({ example: 'uuid-456' })
    private id: string;

    @ApiProperty({ example: 'Av. Santa Fe 1234' })
    private address: string;

    @ApiProperty({ type: NeighborhoodModel })
    private neighborhood: NeighborhoodModel;

    @ApiProperty({ enum: typeProperty, example: typeProperty.DEPARTAMENTO })
    private type: typeProperty;

    @ApiProperty({ example: 3 })
    private rooms: number;

    @ApiProperty({ example: 90 })
    private totalSurface: number;

    @ApiProperty({ example: 85 })
    private coveredSurface: number

    @ApiProperty({ example: 300000 })
    private price: number;

    @ApiProperty({ example: 2015 })
    private constructionYear: number;

    @ApiProperty()
    private createdAt: Date;

    @ApiProperty()
    private updatedAt: Date;


    constructor(
        id: string,
        address: string,
        neighborhood: NeighborhoodModel,
        type: typeProperty,
        rooms: number,
        totalSurface: number,
        coveredSurface: number,
        price: number,
        constructionYear: number,
        createdAt: Date,
        updatedAt: Date
    ) {
        this.id = id;
        this.address = address;
        this.neighborhood = neighborhood;
        this.type = type;
        this.rooms = rooms;
        this.totalSurface = totalSurface;
        this.coveredSurface = coveredSurface;
        this.price = price;
        this.constructionYear = constructionYear;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static create(
        id: string,
        address: string,
        neighborhood: NeighborhoodModel,
        type: typeProperty,
        rooms: number,
        totalSurface: number,
        coveredSurface: number,
        price: number,
        constructionYear: number,
    ): PropertyModel {
        const now = new Date();
        return new PropertyModel(
            id,
            address,
            neighborhood,
            type,
            rooms,
            totalSurface,
            coveredSurface,
            price,
            constructionYear,
            now,
            now
        );
    }

    static reconstruct(
        id: string,
        address: string,
        neighborhood: NeighborhoodModel,
        type: typeProperty,
        rooms: number,
        totalSurface: number,
        coveredSurface: number,
        price: number,
        constructionYear: number,
        createdAt: Date,
        updatedAt: Date
    ): PropertyModel {
        return new PropertyModel(
            id,
            address,
            neighborhood,
            type,
            rooms,
            totalSurface,
            coveredSurface,
            price,
            constructionYear,
            createdAt,
            updatedAt
        );
    }

    public getId(): string {
        return this.id;
    }
    public getAddress(): string {
        return this.address;
    }
    public getNeighborhood(): NeighborhoodModel {
        return this.neighborhood;
    }
    public getType(): typeProperty {
        return this.type;
    }
    public getRooms(): number {
        return this.rooms;
    }
    public getTotalSurface(): number {
        return this.totalSurface;
    }
    public getCoveredSurface(): number {
        return this.coveredSurface;
    }
    public getPrice(): number {
        return this.price;
    }
    public getConstructionYear(): number {
        return this.constructionYear;
    }
    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getUpdatedAt(): Date {
        return this.updatedAt;
    }

    public updatePrice(newPrice: number): void {
        if (newPrice <= 0) {
            throw new PriceBelowZeroException();
        }
        this.price = newPrice;
        this.updatedAt = new Date();
    }

    public getPricePerSquareMeter(): number {
        if (this.coveredSurface === 0) {
            return 0;
        }
        return this.price / this.coveredSurface;
    }

    public toPrimitives(): any {
        return {
            id: this.id,
            address: this.address,
            neighborhood: this.neighborhood.getName(),
            type: this.type,
            rooms: this.rooms,
            totalSurface: this.totalSurface,
            coveredSurface: this.coveredSurface,
            price: this.price,
            constructionYear: this.constructionYear,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

}