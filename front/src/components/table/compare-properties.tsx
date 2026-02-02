"use client";
import { Property } from "@/types/properties";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";

interface ComparePropertiesProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedProperties: Property[];
}
export const CompareProperties = ({ isOpen, onOpenChange, selectedProperties }: ComparePropertiesProps) => {
    if (selectedProperties.length === 0) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-4xl overflow-y-auto">
                <SheetHeader className="mb-6">
                    <SheetTitle className="text-2xl font-bold">Comparativa de Propiedades</SheetTitle>
                    <SheetDescription>
                        Análisis detallado de las {selectedProperties.length} propiedades seleccionadas.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
                    <div className="hidden md:flex flex-col gap-8 pt-44 font-semibold text-muted-foreground uppercase text-[10px] tracking-widest">
                        <div>Precio</div>
                        <div>Precio por m²</div>
                        <div>Ambientes</div>
                        <div>Sup. Total</div>
                        <div>Barrio</div>
                        <div>Tipo</div>
                    </div>

                    <div className={`grid grid-cols-${selectedProperties.length} gap-4`}>
                        {selectedProperties.map((prop) => {
                            const pricePerM2 = prop.price / (prop.totalSurface || 1);
                            return (
                                <div key={prop.id} className="flex flex-col gap-6 bg-muted/30 p-4 rounded-2xl border border-border/50 relative overflow-hidden">
                                    <div className="h-40 flex flex-col justify-end">
                                        <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-tighter">ID: {prop.id.slice(0, 8)}</div>
                                        <div className="text-sm font-bold line-clamp-2 leading-tight mb-2">{prop.address}</div>
                                        <div className="w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        <div className="text-lg font-black text-foreground">$ {prop.price.toLocaleString("es-AR")}</div>
                                        <div className="text-sm font-medium text-emerald-500">USD {Math.round(pricePerM2).toLocaleString()}</div>
                                        <div className="text-sm">{prop.rooms} Amb.</div>
                                        <div className="text-sm">{prop.totalSurface} m²</div>
                                        <div className="text-sm font-semibold capitalize">{prop.neighborhood.name}</div>
                                        <div className="text-sm capitalize">{prop.type}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};
