import CreatePropertyUseCase from "./createProperty.usecase";
import DeletePropertyUseCase from "./deleteProperty.usecase";
import GetAllPropertiesUseCase from "./getAllProperties.usecase";
import GetPropertyByIdUseCase from "./getPropertyById.usecase";
import SearchPropertiesUseCase from "./searchProperties.usecase";
import UpdatePropertyUseCase from "./updateProperty.usecase";
import UploadDataUseCase from "./uploadData.usecase";

export const PropertyUseCases = [
    GetAllPropertiesUseCase,
    GetPropertyByIdUseCase,
    CreatePropertyUseCase,
    UpdatePropertyUseCase,
    DeletePropertyUseCase,
    UploadDataUseCase,
    SearchPropertiesUseCase
];