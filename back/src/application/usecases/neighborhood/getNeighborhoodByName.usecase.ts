import { Injectable } from "@nestjs/common";
import { INeighborhoodRepository } from "src/domain/ports/neighborhood.repository";

@Injectable()
export default class GetNeighborhoodByNameUseCase {
    constructor(
        private readonly neighborhoodRepository: INeighborhoodRepository,
    ) { }

    public async handler(name: string) {
        return await this.neighborhoodRepository.getNeighborhoodByName(name);
    }
}