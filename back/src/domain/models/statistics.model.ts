import { ApiProperty } from "@nestjs/swagger";

export class StatisticsModel {
    @ApiProperty({ example: 'Palermo' })
    public readonly neighborhoodName: string;

    @ApiProperty({ example: 150 })
    public readonly totalProperties: number;

    @ApiProperty({ example: 350000 })
    public readonly averagePrice: number;

    @ApiProperty({ example: 50000 })
    public readonly standardDeviationPrice: number;

    @ApiProperty({ example: 4500 })
    public readonly averagePricePerSquareMeter: number;

    @ApiProperty({ example: 600 })
    public readonly standardDeviationPricePerSquareMeter: number;

    @ApiProperty({ example: 120 })
    public readonly totalApartments: number;

    @ApiProperty({ example: 20 })
    public readonly totalHouses: number;

    @ApiProperty({ example: 10 })
    public readonly totalPenthouses: number;

    constructor(
        neighborhoodName: string,
        totalProperties: number,
        averagePrice: number,
        standardDeviationPrice: number,
        averagePricePerSquareMeter: number,
        standardDeviationPricePerSquareMeter: number,
        totalApartments: number,
        totalHouses: number,
        totalPenthouses: number,
    ) {
        this.neighborhoodName = neighborhoodName;
        this.totalProperties = totalProperties;
        this.averagePrice = averagePrice;
        this.standardDeviationPrice = standardDeviationPrice;
        this.averagePricePerSquareMeter = averagePricePerSquareMeter;
        this.standardDeviationPricePerSquareMeter = standardDeviationPricePerSquareMeter;
        this.totalApartments = totalApartments;
        this.totalHouses = totalHouses;
        this.totalPenthouses = totalPenthouses;
    }
}