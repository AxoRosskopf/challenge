export type Property = {
    id: string;
    address: string;
    neighborhood: {
        id: string;
        name: string;
        geometry: any;
    };
    type: "departamento" | "casa" | "PH";
    rooms: number;
    price: number;
    coveredSurface: number;
    totalSurface: number;
    constructionYear: number;
    createdAt: string;
    updatedAt: string;
}

export type PaginatedProperties = {
    data: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}