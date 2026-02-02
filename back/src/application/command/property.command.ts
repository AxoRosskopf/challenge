import { typeProperty } from "src/domain/models/enums/property-type";

export default class CreatePropertyCommand {
    constructor(
        public readonly address: string,
        public readonly neighborhoodName: string,
        public readonly type: typeProperty,
        public readonly rooms: number,
        public readonly totalSurface: number,
        public readonly coveredSurface: number,
        public readonly price: number,
        public readonly constructionYear: number,
    ) { }
}