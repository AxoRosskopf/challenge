import { Property } from "@/types/properties";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ComparePropertiesContentProps {
    properties: Property[];
}

export function ComparePropertiesContent({ properties }: ComparePropertiesContentProps) {
    return (
        <DialogContent className="sm:max-w-[90vw] md:max-w-[75vw] lg:max-w-[1000px] overflow-y-auto min-h-[60vh] flex flex-col
        justify-center items-center gap-8
         ">
            <DialogHeader className="flex flex-col items-center">
                <DialogTitle>Comparar propiedades</DialogTitle>
                <DialogDescription>
                    Se seleccionaron {properties.length} propiedades para comparar.
                </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap gap-4 w-full justify-center">
                {properties.map((property) => (
                    <Card key={property.id} className="shadow-none border border-border/60 w-[30%]">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base font-semibold">{property.address}</CardTitle>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider">{property.neighborhood.name}</p>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm">
                            <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                                <span className="text-muted-foreground">Precio</span>
                                <span className="font-bold">USD {property.price.toLocaleString("es-AR")}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                                <span className="text-muted-foreground">Dimensiones</span>
                                <span>{property.totalSurface} m² total</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                                <span className="text-muted-foreground">Ambientes</span>
                                <span>{property.rooms} {property.rooms === 1 ? 'Ambiente' : 'Ambientes'}</span>
                            </div>
                            <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                                <span className="text-muted-foreground">Tipo</span>
                                <span className="capitalize">{property.type}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-[10px] text-muted-foreground uppercase font-medium">USD / m²</span>
                                <span className="text-xs font-semibold">
                                    {"USD " + Math.round(property.price / property.totalSurface).toLocaleString("es-AR")}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </DialogContent>
    );
}
