import { useState, useEffect, useMemo } from "react";
import {
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnDef
} from "@tanstack/react-table";
import { globalFilterFn } from "@/components/table/utils/filter-auxiliar-fn";
import { apiService } from "@/services/api";

export const useDataTable = <TData, TValue>({
    data,
    columns,
}: {
    data: TData[];
    columns: ColumnDef<TData, TValue>[];
}) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [ambientes, setAmbientes] = useState<number[]>([1, 7]);
    const [minimo, setMinimo] = useState<number | "">("");
    const [maximo, setMaximo] = useState<number | "">("");
    const [barrioSelected, setBarrioSelected] = useState<string[]>([]);
    const [tipoSelected, setTipoSelected] = useState<string[]>([]);
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [localData, setLocalData] = useState<TData[]>(data);
    const [lastFetchedPage, setLastFetchedPage] = useState(3);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    useEffect(() => {
        setLocalData(data);
    }, [data]);

    const [isSearching, setIsSearching] = useState(false);
    const [searchResults, setSearchResults] = useState<TData[]>([]);
    const [totalResults, setTotalResults] = useState(0);

    const displayData = useMemo(() => {
        if (searchTerm.trim() !== "") {
            return searchResults;
        }
        return localData;
    }, [localData, searchResults, searchTerm]);

    useEffect(() => {
        const fetchSearch = async () => {
            if (searchTerm.trim() === "") {
                setSearchResults([]);
                setIsSearching(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await apiService.searchProperties(searchTerm, 1, 300);
                setSearchResults(response.data as TData[]);
                setTotalResults(response.total);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setIsSearching(false);
            }
        };

        fetchSearch();
    }, [searchTerm]);

    const [globalFilter, setGlobalFilter] = useState({
        barrios: [] as string[],
        tipos: [] as string[],
        ambientes: [1, 7],
        precio_estimado: ["", ""] as (number | "")[],
        search: "",
    });

    useEffect(() => {
        setGlobalFilter({
            barrios: barrioSelected,
            tipos: tipoSelected,
            ambientes: ambientes,
            precio_estimado: [minimo, maximo],
            search: searchTerm,
        });
    }, [ambientes, minimo, maximo, barrioSelected, tipoSelected, searchTerm]);

    const toggleProperty = (id: string) => {
        setSelectedRows((prev) => {
            if (prev.includes(id)) {
                return prev.filter((i) => i !== id);
            }
            if (prev.length >= 3) return prev;
            return [...prev, id];
        });
    };

    const sortedData = useMemo(() => {
        if (selectedRows.length === 0) return displayData;

        const selected = displayData.filter((item: any) => selectedRows.includes(item.id));
        const rest = displayData.filter((item: any) => !selectedRows.includes(item.id));

        return [...selected, ...rest];
    }, [displayData, selectedRows]);

    const table = useReactTable({
        data: sortedData,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        meta: {
            selectedRows,
            toggleProperty,
        },
        autoResetPageIndex: false,
    });

    const currentPage = table.getState().pagination.pageIndex + 1;

    useEffect(() => {
        const loadMoreData = async () => {
            if (isLoadingMore || searchTerm.trim() !== "") return;
            const totalPagesAvailable = Math.ceil(localData.length / 10);

            if (currentPage >= totalPagesAvailable - 1 && totalPagesAvailable >= 30) {
                setIsLoadingMore(true);
                try {
                    const nextPageToFetch = lastFetchedPage + 1;
                    const response = await apiService.getProperties(nextPageToFetch, 100);
                    if (response.data && response.data.length > 0) {
                        setLocalData(prev => [...prev, ...response.data as TData[]]);
                        setLastFetchedPage(nextPageToFetch + 9);
                    }
                } catch (error) {
                    console.error("Error loading more properties:", error);
                } finally {
                    setIsLoadingMore(false);
                }
            }
        };

        loadMoreData();
    }, [currentPage, localData.length, lastFetchedPage, searchTerm, isLoadingMore]);

    return {
        table,
        displayData,
        filters: {
            ambientes,
            setAmbientes,
            minimo,
            setMinimo,
            maximo,
            setMaximo,
            barrioSelected,
            setBarrioSelected,
            tipoSelected,
            setTipoSelected,
            selectedRows,
            setSelectedRows,
            searchTerm,
            setSearchTerm,
            isSearching,
            isLoadingMore
        }
    };
};
