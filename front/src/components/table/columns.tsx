"use client";
import { Property } from "@/types/properties";
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "../ui/button";
import { ArrowUpDown, ArrowUpRightFromSquare } from "lucide-react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";

export const column: ColumnDef<Property>[] = [
    {
        accessorKey: "check",
        header: "",
        enableHiding: false,
        cell: ({ row, table }) => {
            const property = row.original;
            const meta = table.options.meta as any;
            const isSelected = meta?.selectedRows?.includes(property.id);
            const canSelectMore = (meta?.selectedRows?.length ?? 0) < 3;

            return (
                <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => meta?.toggleProperty?.(property.id)}
                    disabled={!isSelected && !canSelectMore}
                />
            );
        }
    },
    {
        accessorKey: "neighborhood.name",
        header: "Barrio",
        cell: ({ row }) => {
            return <span className="capitalize">{row.original.neighborhood.name}</span>
        }
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => {
            return <span className="capitalize">{row.getValue("type")}</span>
        }
    },
    {
        accessorKey: "rooms",
        header: ((column) => {
            return (
                <div
                    className="flex flex-row gap-2 items-center"
                    onClick={() => column.column.toggleSorting(column.column.getIsSorted() === "asc")}
                >
                    Ambientes
                    <ArrowUpDown size={16} />
                </div>)
        })

    },
    {
        accessorKey: "price",
        header: ((column) => {
            return (
                <div
                    className="flex flex-row gap-2 items-center"
                    onClick={() => column.column.toggleSorting(column.column.getIsSorted() === "asc")}
                >
                    Precio Estimado
                    <ArrowUpDown size={16} />
                </div>)
        }),
        cell: ({ row }) => {
            return <span >$ {(row.getValue("price") as number).toLocaleString("es-AR")}</span>
        }
    }, {
        id: "more_info",
        enableHiding: false,
        cell: ({ row }) => {
            const property = row.original;
            return (
                <Drawer direction="right">
                    <DrawerTrigger asChild>
                        <Button variant="outline" size="xs" >
                            <ArrowUpRightFromSquare size={16} />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader className="p-6">
                            <DrawerTitle>
                                Informacion de la propiedad
                            </DrawerTitle>
                            <Separator />
                            <div className="flex flex-col gap-2 mt-4">
                                <span><strong>Barrio:</strong> {property.neighborhood.name}</span>
                                <span className="capitalize"><strong>Tipo:</strong> {property.type}</span>
                                <span><strong>Ambientes:</strong> {property.rooms}</span>
                                <span><strong>Precio Estimado:</strong> $ {property.price.toLocaleString("es-AR")}</span>
                                <span><strong>Superficie Cubierta:</strong> {property.coveredSurface} m²</span>
                                <span><strong>Superficie Total:</strong> {property.totalSurface} m²</span>
                                <span><strong>Dirección:</strong> {property.address}</span>
                            </div>
                        </DrawerHeader>
                    </DrawerContent>
                </Drawer>
            )
        },

    }
];
