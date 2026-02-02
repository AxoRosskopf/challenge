import { Injectable } from "@nestjs/common";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";

@Injectable()
export default class GetNeighborhoodByIdUseCase {
    constructor(
        private readonly neighborhoodRepository: INeighborhoodRepository
    ) { }

    public async handler(id: string) {
        return await this.neighborhoodRepository.getNeighborhoodById(id);
    }
}   