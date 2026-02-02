import NeighborhoodModel from "../models/neighborhood.model";

export abstract class INeighborhoodRepository {
    abstract getAllNeighborhoods(): Promise<NeighborhoodModel[]>;
    abstract getNeighborhoodById(id: string): Promise<NeighborhoodModel | null>;
    abstract getNeighborhoodByName(name: string): Promise<NeighborhoodModel | null>;
    abstract saveAll(neighborhoods: NeighborhoodModel[]): Promise<void>;
}