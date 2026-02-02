"use client"

import { flexRender, Table as TableType } from "@tanstack/react-table"
import { TableHeader, TableRow, TableHead } from "@/components/ui/table"

export function DataTableHeader<TData>({ table }: { table: TableType<TData> }) {
    return (
        <TableHeader className="bg-muted/50">
            {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                    {headerGroup.headers.map((header) => (
                        <TableHead
                            key={header.id}
                            className="h-12 px-4 text-left align-middle font-medium text-muted-foreground uppercase text-xs tracking-wider"
                        >
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </TableHead>
                    ))}
                </TableRow>
            ))}
        </TableHeader>
    )
}
