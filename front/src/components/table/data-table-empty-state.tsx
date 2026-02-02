"use client"

import { TableRow, TableCell } from "@/components/ui/table"
import { InboxIcon } from "lucide-react"
import { Skeleton } from "../ui/skeleton";

export function DataTableEmptyState({
    colSpan,
    isSearching
}: {
    colSpan: number;
    isSearching: boolean
}) {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                className="h-48 text-center"
            >
                <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    {isSearching ? (
                        <Skeleton />
                    ) : (
                        <InboxIcon className="h-8 w-8 opacity-20" />
                    )}
                    <span className="text-sm font-medium">
                        {isSearching ? "Buscando propiedades..." : "No se encontraron resultados"}
                    </span>
                </div>
            </TableCell>
        </TableRow>
    )
}
