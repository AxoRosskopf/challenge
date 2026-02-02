import { Injectable } from "@nestjs/common";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";

@Injectable()
export default class GetAllNeighborhoodsUseCase {
    constructor(
        private readonly neighborhoodRepository: INeighborhoodRepository
    ) { }

    public async handler() {
        return await this.neighborhoodRepository.getAllNeighborhoods();
    }
}