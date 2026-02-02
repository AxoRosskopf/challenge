"use client"

import { Skeleton } from "@/components/ui/skeleton"

interface DataTableSkeletonProps {
    rowCount?: number;
}

export function DataTableSkeleton({ rowCount = 10 }: DataTableSkeletonProps) {
    const tableHeight = (rowCount * 56.5) + 48;

    return (
        <div className="flex flex-col gap-4 items-end w-full">
            <div className="flex gap-2 flex-row items-center justify-between w-full">
                <Skeleton className="h-10 w-[25rem]" />
                <div className="flex flex-row gap-2 items-center">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-20" />
                </div>
            </div>
            <div className="rounded-xl border bg-card text-card-foreground shadow-sm w-full overflow-hidden">
                <div className="overflow-x-auto">
                    <Skeleton style={{ height: `${tableHeight}px` }} className="w-full" />
                </div>
            </div>
            <div className="flex items-center justify-center w-full px-2">
                <div className="flex flex-row items-center gap-2">
                    <Skeleton className="h-9 w-24" />
                    <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-9 w-9" />
                        ))}
                    </div>
                    <Skeleton className="h-9 w-24" />
                </div>
            </div>
        </div>
    )
}
