"use client"
import { ColumnDef } from "@tanstack/react-table"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableContent } from "./data-table-content"
import { DataTablePagination } from "./data-table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { table, filters, displayData } = useDataTable({ data, columns })


  return (
    <div className="flex flex-col gap-4 items-end w-full">
      <DataTableToolbar data={displayData} filters={filters} />
      <DataTableContent table={table} columns={columns} isSearching={filters.isSearching} />
      <DataTablePagination table={table} />
    </div>
  )
}