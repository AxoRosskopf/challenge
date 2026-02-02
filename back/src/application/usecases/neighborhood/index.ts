import GetAllNeighborhoodsUseCase from "./getAllNeighborhoods.usecase";
import GetNeighborhoodByIdUseCase from "./getNeighborhoodById.usecase";
import GetNeighborhoodByNameUseCase from "./getNeighborhoodByName.usecase";
import UploadDataUseCase from "./uploadData.usecase";

export const NeighborhoodUseCases = [
    GetAllNeighborhoodsUseCase,
    GetNeighborhoodByNameUseCase,
    GetNeighborhoodByIdUseCase,
    UploadDataUseCase,
];  