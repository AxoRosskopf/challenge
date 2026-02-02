import { PaginatedProperties } from "@/types/properties";
import { Statistics } from "@/types/statistics";

const API_BASE_URL = "http://localhost:3001/api/v1";

const CACHE_DURATION = 60 * 60 * 1000;

const getFromCache = (key: string) => {
    if (typeof window === 'undefined') return null;
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
        const { data, timestamp } = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;
        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch (e) {
        return null;
    }
};

const setToCache = (key: string, data: any) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify({
        data,
        timestamp: Date.now()
    }));
};

export const apiService = {
    async getNeighborhoods(): Promise<any[]> {
        const cacheKey = 'neighborhoods_data';
        const cached = getFromCache(cacheKey);
        if (cached) return cached;

        const response = await fetch(`${API_BASE_URL}/neighborhoods`);
        if (!response.ok) throw new Error("Failed to fetch neighborhoods");

        const data = await response.json();
        setToCache(cacheKey, data);
        return data;
    },

    async getProperties(page = 1, limit = 10): Promise<PaginatedProperties> {
        const response = await fetch(`${API_BASE_URL}/properties?page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error("Failed to fetch properties");
        return response.json();
    },

    async getAllStatistics(): Promise<Statistics[]> {
        const cacheKey = 'global_statistics';
        const cached = getFromCache(cacheKey);
        if (cached) return cached;

        const response = await fetch(`${API_BASE_URL}/statistics`);
        if (!response.ok) throw new Error("Failed to fetch statistics");

        const data = await response.json();
        setToCache(cacheKey, data);
        return data;
    },

    async getGlobalOverview() {
        return getFromCache('global_overview_metrics');
    },

    setGlobalOverview(metrics: any) {
        setToCache('global_overview_metrics', metrics);
    },

    async getStatisticsByNeighborhood(name: string): Promise<Statistics> {
        const cacheKey = `stats_${name.toLowerCase()}`;
        const cached = getFromCache(cacheKey);
        if (cached) return cached;

        const response = await fetch(`${API_BASE_URL}/statistics/${encodeURIComponent(name)}`);
        if (!response.ok) throw new Error("Failed to fetch neighborhood statistics");

        const data = await response.json();
        setToCache(cacheKey, data);
        return data;
    },

    async searchProperties(query: string, page = 1, limit = 10): Promise<PaginatedProperties> {
        const response = await fetch(`${API_BASE_URL}/properties/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
        if (!response.ok) throw new Error("Failed to search properties");
        return response.json();
    }
};
