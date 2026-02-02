import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { typeProperty } from "src/domain/models/enums/property-type";

export class CreatePropertyDto {
    @ApiProperty({ example: 'Av. Libertador 1234' })
    @IsString()
    @IsNotEmpty()
    readonly address: string;

    @ApiProperty({ example: 'Palermo' })
    @IsString()
    @IsNotEmpty()
    readonly neighborhoodName: string;

    @ApiProperty({ enum: typeProperty, example: typeProperty.DEPARTAMENTO })
    @IsEnum(typeProperty)
    readonly type: typeProperty;

    @ApiProperty({ example: 3 })
    @IsInt()
    @Min(1)
    readonly rooms: number;

    @ApiProperty({ example: 80 })
    @IsNumber()
    @Min(0)
    readonly totalSurface: number;

    @ApiProperty({ example: 75 })
    @IsNumber()
    @Min(0)
    readonly coveredSurface: number;

    @ApiProperty({ example: 250000 })
    @IsNumber()
    @Min(0)
    readonly price: number;

    @ApiProperty({ example: 2010 })
    @IsInt()
    readonly constructionYear: number;
}