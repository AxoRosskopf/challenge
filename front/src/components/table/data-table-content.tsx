"use client"

import {
    ColumnDef,
    Table as TableType,
} from "@tanstack/react-table"
import {
    Table,
    TableBody,
} from "@/components/ui/table"
import { DataTableHeader } from "./data-table-header"
import { DataTableRow } from "./data-table-row"
import { DataTableEmptyState } from "./data-table-empty-state"

interface DataTableContentProps<TData, TValue> {
    table: TableType<TData>
    columns: ColumnDef<TData, TValue>[]
    isSearching?: boolean
}

export function DataTableContent<TData, TValue>({
    table,
    columns,
    isSearching = false,
}: DataTableContentProps<TData, TValue>) {
    const rows = table.getRowModel().rows

    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm w-full overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="w-full">
                    <DataTableHeader table={table} />
                    <TableBody>
                        {rows?.length ? (
                            rows.map((row) => (
                                <DataTableRow key={row.id} row={row} />
                            ))
                        ) : (
                            <DataTableEmptyState
                                colSpan={columns.length}
                                isSearching={isSearching}
                            />
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
