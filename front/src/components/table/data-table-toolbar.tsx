"use client"

import { useState, useEffect } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Dialog, DialogTrigger } from "../ui/dialog"
import { ComparePropertiesContent } from "./compare-properties-content"
import Filters from "./filters"
import { Property } from "@/types/properties"

import { Loader2, Search } from "lucide-react"

interface DataTableToolbarProps<TData> {
    data: TData[]
    filters: any
}
export function DataTableToolbar<TData>({
    data,
    filters
}: DataTableToolbarProps<TData>) {
    const [localSearch, setLocalSearch] = useState(filters.searchTerm)

    useEffect(() => {
        setLocalSearch(filters.searchTerm)
    }, [filters.searchTerm])

    const handleSearch = () => {
        filters.setSearchTerm(localSearch)
    }

    return (
        <div className="flex gap-2 flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2">
                <div className="relative w-[18rem] md:w-[25rem]">
                    <Input
                        placeholder="Buscar propiedades..."
                        className="w-full flex items-center justify-start gap-2 pl-10 pr-4"
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch()
                            }
                        }}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        {filters.isSearching ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : null}
                    </div>
                </div>
                <Button
                    onClick={handleSearch}
                    className="flex items-center gap-2"
                >
                    <Search className="h-4 w-4" />
                    <span>Buscar</span>
                </Button>
            </div>
            <div className="flex flex-row gap-2 items-center">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            disabled={filters.selectedRows.length < 2}
                            variant={filters.selectedRows.length >= 2 ? "default" : "outline"}
                        >
                            <span>
                                Comparar{" "}
                                {filters.selectedRows.length > 0 &&
                                    `(${filters.selectedRows.length})`}
                            </span>
                        </Button>
                    </DialogTrigger>
                    <ComparePropertiesContent
                        properties={
                            data.filter((item: any) =>
                                filters.selectedRows.includes(item.id)
                            ) as Property[]
                        }
                    />
                </Dialog>
                <Filters {...filters} />
            </div>
        </div>
    )
}
