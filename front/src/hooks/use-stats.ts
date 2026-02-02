import { useState, useEffect } from 'react';
import { apiService } from '@/services/api';
import { Statistics } from '@/types/statistics';

export const useStats = () => {
    const [stats, setStats] = useState<Record<string, Statistics>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                if (typeof window !== 'undefined') {
                    const cached = localStorage.getItem('global_statistics');
                    if (cached) {
                        try {
                            const { data, timestamp } = JSON.parse(cached);
                            if (Date.now() - timestamp < 3600000) {
                                const statsMap: Record<string, Statistics> = {};
                                data.forEach((s: Statistics) => { statsMap[s.neighborhoodName] = s; });
                                setStats(statsMap);
                                setLoading(false);
                            }
                        } catch (e) { }
                    }
                }

                const data: Statistics[] = await apiService.getAllStatistics();
                const statsMap: Record<string, Statistics> = {};
                data.forEach(s => {
                    statsMap[s.neighborhoodName] = s;
                });
                setStats(statsMap);
            } catch (error) {
                console.error("Error fetching statistics:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    return { stats, loading };
};
