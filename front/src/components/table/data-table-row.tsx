"use client"

import { flexRender, Row } from "@tanstack/react-table"
import { TableRow, TableCell } from "@/components/ui/table"

export function DataTableRow<TData>({ row }: { row: Row<TData> }) {
    return (
        <TableRow
            data-state={row.getIsSelected() && "selected"}
            className="transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        >
            {row.getVisibleCells().map((cell) => (
                <TableCell
                    key={cell.id}
                    className="p-4 align-middle [&:has([role=checkbox])]:pr-0"
                >
                    <div className="truncate max-w-[200px]">
                        {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                        )}
                    </div>
                </TableCell>
            ))}
        </TableRow>
    )
}
