"use client"

import { Table } from "@tanstack/react-table"
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "../ui/pagination"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}

export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const currentPage = table.getState().pagination.pageIndex + 1
    const totalPages = table.getPageCount()

    const generatePages = () => {
        const pages = []
        const showEllipsisStart = currentPage > 3
        const showEllipsisEnd = currentPage < totalPages - 2

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i)
        } else {
            pages.push(1)
            if (showEllipsisStart) pages.push("ellipsis-start")

            let start = Math.max(2, currentPage - 1)
            let end = Math.min(totalPages - 1, currentPage + 1)

            if (currentPage <= 3) end = 4
            if (currentPage >= totalPages - 2) start = totalPages - 3

            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i)
            }

            if (showEllipsisEnd) pages.push("ellipsis-end")
            if (!pages.includes(totalPages)) pages.push(totalPages)
        }
        return pages
    }

    return (
        <div className="flex items-center justify-center w-full px-2">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => table.previousPage()}
                            className={
                                !table.getCanPreviousPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                            
                        />
                    </PaginationItem>

                    {generatePages().map((page, idx) => {
                        if (typeof page === "string") {
                            return (
                                <PaginationItem key={`ellipsis-${idx}`}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )
                        }
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    isActive={currentPage === page}
                                    onClick={() => table.setPageIndex(page - 1)}
                                    className="cursor-pointer"
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => table.nextPage()}
                            className={
                                !table.getCanNextPage()
                                    ? "pointer-events-none opacity-50"
                                    : "cursor-pointer"
                            }
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    )
}
