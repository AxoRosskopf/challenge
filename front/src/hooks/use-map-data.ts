import { useState, useEffect, useMemo } from 'react';
import { apiService } from "@/services/api";
import { Statistics } from "@/types/statistics";
import { MapLayer } from '@/types/map';

export const useMapData = (selectedNeighborhood: string | null, selectedMapLayer: MapLayer) => {
    const [geoJSON, setGeoJSON] = useState<any>(null);
    const [neighborhoodStats, setNeighborhoodStats] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [allStats, setAllStats] = useState<Statistics[]>([]);

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                if (typeof window !== 'undefined') {
                    const cachedNeighborhoods = localStorage.getItem('neighborhoods_data');
                    const cachedStats = localStorage.getItem('global_statistics');

                    if (cachedNeighborhoods && cachedStats) {
                        try {
                            const nData = JSON.parse(cachedNeighborhoods);
                            const sData = JSON.parse(cachedStats);

                            if (Date.now() - nData.timestamp < 3600000 && Date.now() - sData.timestamp < 3600000) {
                                const featureCollection = {
                                    type: "FeatureCollection",
                                    features: nData.data.map((item: any) => ({
                                        type: "Feature",
                                        properties: { BARRIO: item.name, id: item.id },
                                        geometry: item.geometry
                                    }))
                                };
                                setGeoJSON(featureCollection);
                                setAllStats(sData.data);
                                setLoading(false);
                            }
                        } catch (e) { }
                    }
                }

                const [neighborhoods, stats] = await Promise.all([
                    apiService.getNeighborhoods(),
                    apiService.getAllStatistics()
                ]);

                const featureCollection = {
                    type: "FeatureCollection",
                    features: neighborhoods.map((item: any) => ({
                        type: "Feature",
                        properties: {
                            BARRIO: item.name,
                            id: item.id
                        },
                        geometry: item.geometry
                    }))
                };
                setGeoJSON(featureCollection);
                setAllStats(stats);
            } catch (error) {
                console.error("Error loading map data:", error);
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    useEffect(() => {
        if (allStats.length === 0) return;

        const statsMap: Record<string, number> = {};
        allStats.forEach((s: Statistics) => {
            if (selectedMapLayer === MapLayer.PROMEDIO) {
                statsMap[s.neighborhoodName] = s.averagePrice;
            } else if (selectedMapLayer === MapLayer.METROCUADRADO) {
                statsMap[s.neighborhoodName] = s.averagePricePerSquareMeter;
            } else if (selectedMapLayer === MapLayer.DENSIDAD) {
                statsMap[s.neighborhoodName] = s.totalProperties;
            }
        });
        setNeighborhoodStats(statsMap);
    }, [allStats, selectedMapLayer]);

    const { min, max, delta } = useMemo(() => {
        const values = Object.values(neighborhoodStats).filter(v => v > 0);
        if (values.length === 0) return { min: 0, max: 0, delta: 0 };

        const min = Math.min(...values);
        const max = Math.max(...values);
        return { min, max, delta: (max - min) / 7 };
    }, [neighborhoodStats]);

    return {
        geoJSON,
        neighborhoodStats,
        min,
        max,
        delta,
        loading
    };
};
