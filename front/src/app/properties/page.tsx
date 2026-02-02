"use client";
import { useEffect, useState } from "react";
import { DataTable } from "@/components/table/data-table";
import { column } from "@/components/table/columns";
import { Property } from "@/types/properties";
import { apiService } from "@/services/api";
import { DataTableSkeleton } from "@/components/table/data-table-skeleton";

const Page = () => {
  const [dataProperties, setDataProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiService.getProperties(1, 300);
        setDataProperties(response.data || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div className="flex flex-col items-start max-w-full p-8 gap-4">
      <h1 className="font-bold text-2xl">Propiedades</h1>
      {loading ? (
        <DataTableSkeleton />
      ) : (
        <DataTable columns={column} data={dataProperties} />
      )}
    </div>
  )
}

export default Page