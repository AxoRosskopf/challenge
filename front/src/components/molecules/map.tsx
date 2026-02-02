import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Dispatch, SetStateAction, useMemo, useCallback, memo } from "react";
import { NEIGHBORHOODS } from "../table/utils/text-samples";
import { getColorByData, normalizeText } from "@/lib/utils";
import { useMapData } from "@/hooks/use-map-data";
import { MapLayer } from "@/types/map";
import L from 'leaflet';

interface MapProps {
    selectedNeighborhood: string | null;
    selectedMapLayer: MapLayer;
    setSelectedNeighborhood: Dispatch<SetStateAction<string | null>>;
    setSelectedMapLayer: Dispatch<SetStateAction<MapLayer>>;
}

const BUENOS_AIRES_CENTER: LatLngExpression = [-34.6037, -58.435];

const Map = memo(({ selectedNeighborhood, selectedMapLayer, setSelectedNeighborhood, setSelectedMapLayer }: MapProps) => {
    const { geoJSON, neighborhoodStats, min, delta, loading } = useMapData(selectedNeighborhood, selectedMapLayer);

    const normalizedStatsMap = useMemo(() => {
        const map: Record<string, number> = {};
        Object.entries(neighborhoodStats).forEach(([key, value]) => {
            map[normalizeText(key)] = value;
        });
        return map;
    }, [neighborhoodStats]);

    const getStyle = useCallback((feature: any) => {
        const barrioName = feature?.properties?.BARRIO;
        const normalizedBarrio = normalizeText(barrioName);
        const count = normalizedStatsMap[normalizedBarrio] || 0;

        const isSelected = selectedNeighborhood &&
            normalizeText(selectedNeighborhood) === normalizedBarrio;

        return {
            fillColor: getColorByData(count, min, delta),
            weight: isSelected ? 3 : 1,
            opacity: isSelected ? 1 : 0.8,
            color: isSelected ? "#9500ffff" : "rgba(255,255,255,0.4)",
            fillOpacity: isSelected ? 0.85 : 0.6,
        };
    }, [normalizedStatsMap, selectedNeighborhood, min, delta]);

    const handleNeighborhoodInteraction = useCallback((feature: any, layer: any) => {
        const barrioName = feature.properties?.BARRIO;
        if (!barrioName) return;

        layer.on({
            mouseover: (e: any) => {
                const target = e.target;
                const isSelected = selectedNeighborhood && normalizeText(barrioName) === normalizeText(selectedNeighborhood);
                if (!isSelected) {
                    target.setStyle({
                        fillOpacity: 0.9,
                        weight: 2,
                        color: "rgba(255,255,255,0.8)"
                    });
                    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                        target.bringToFront();
                    }
                }
            },
            mouseout: (e: any) => {
                const target = e.target;
                const isSelected = selectedNeighborhood && normalizeText(barrioName) === normalizeText(selectedNeighborhood);
                if (!isSelected) {
                    target.setStyle({
                        fillOpacity: 0.6,
                        weight: 1,
                        color: "rgba(255,255,255,0.4)"
                    });
                }
            },
            click: () => {
                const normalizedDefaultName = NEIGHBORHOODS.find(
                    (n) => n.toUpperCase() === barrioName.toUpperCase()
                );
                setSelectedNeighborhood(normalizedDefaultName || barrioName);
            }
        });
    }, [selectedNeighborhood, setSelectedNeighborhood]);

    if (loading && !geoJSON) {
        return <div className="h-full w-full flex items-center justify-center bg-muted/20 animate-pulse text-muted-foreground">Cargando mapa...</div>;
    }

    return (
        <div className="border rounded-lg overflow-hidden h-full w-[50%] relative group bg-muted/10">
            <MapContainer
                preferCanvas={true}
                boxZoom={false}
                center={BUENOS_AIRES_CENTER}
                zoom={12}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {geoJSON && (
                    <GeoJSON
                        data={geoJSON}
                        key={`geojson-layer-${selectedMapLayer}`}
                        style={getStyle}
                        onEachFeature={handleNeighborhoodInteraction}
                    />
                )}
            </MapContainer>
        </div>
    );
});

Map.displayName = "Map";

export default Map;