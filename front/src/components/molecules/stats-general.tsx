import { Card } from '../ui/card'
import { useStats } from '@/hooks/use-stats';
import {
  Building2Icon,
  BarChart3Icon,
  InfoIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from 'lucide-react';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { MetricCard } from './stats-atoms/metric-card';
import { MapLayer } from '@/types/map';

const StatsGeneral = ({ selectedMapLayer, setSelectedMapLayer }: { selectedMapLayer: MapLayer, setSelectedMapLayer: Dispatch<SetStateAction<MapLayer>> }) => {
  const { stats, loading } = useStats();

  const activeOption = "text-[10px] font-medium text-primary px-2 py-0.5 bg-primary/10 rounded-full border border-primary/20 cursor-pointer"
  const inactiveOption = "text-[10px] font-medium text-muted-foreground px-2 py-0.5 bg-muted rounded-full opacity-50 cursor-pointer"


  const handleMapLayerChange = (layer: MapLayer) => {
    if (layer === selectedMapLayer) return;
    setSelectedMapLayer(layer);
  };

  const globalStats = useMemo(() => {
    const data = Object.values(stats);
    if (data.length === 0) return null;

    const metrics = {
      totalProperties: data.reduce((acc, curr) => acc + curr.totalProperties, 0),
      avgPrice: data.reduce((acc, curr) => acc + curr.averagePrice, 0) / data.length,
      mostExpensive: [...data].sort((a, b) => b.averagePrice - a.averagePrice)[0],
      cheapest: [...data].sort((a, b) => a.averagePrice - b.averagePrice)[0]
    };

    import('@/services/api').then(({ apiService }) => {
      apiService.setGlobalOverview(metrics);
    });

    return metrics;
  }, [stats]);

  return (
    <Card className='min-w-[50%] flex-1 p-6 flex flex-col gap-6 bg-gradient-to-tr from-card to-secondary/10 border-none relative overflow-hidden'>
      <div className="flex items-center justify-between z-10">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight">Resumen General</h2>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <InfoIcon className="w-3 h-3" />
            Estadísticas globales del mercado inmobiliario
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground animate-pulse">Analizando datos del mercado...</span>
          </div>
        </div>
      ) : globalStats ? (
        <div className="grid grid-cols-2 gap-4 h-full content-start z-10">
          <MetricCard
            icon={<Building2Icon className="w-4 h-4 text-blue-500" />}
            label="Unidades Totales"
            value={globalStats.totalProperties.toLocaleString()}
            description="Propiedades registradas"
          />
          <MetricCard
            icon={<BarChart3Icon className="w-4 h-4 text-emerald-500" />}
            label="Precio Promedio Total"
            value={`USD ${Math.round(globalStats.avgPrice).toLocaleString()}`}
            description="Promedio de oferta"
          />
          <MetricCard
            icon={<ArrowUpIcon className="w-4 h-4 text-rose-500" />}
            label="Barrio mas caro"
            value={globalStats.mostExpensive.neighborhoodName}
            description={`USD ${Math.round(globalStats.mostExpensive.averagePrice).toLocaleString()} avg.`}
          />
          <MetricCard
            icon={<ArrowDownIcon className="w-4 h-4 text-amber-500" />}
            label="Barrio mas barato"
            value={globalStats.cheapest.neighborhoodName}
            description={`USD ${Math.round(globalStats.cheapest.averagePrice).toLocaleString()} avg.`}
          />
        </div>
      ) : null}

      <div className="mt-auto pt-4 border-t border-muted/20 flex gap-2 z-10">
        <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Map Layers:</span>
        <span
          className={selectedMapLayer === MapLayer.PROMEDIO ?
            activeOption : inactiveOption}
          onClick={() => handleMapLayerChange(MapLayer.PROMEDIO)}
        >Precio Promedio</span>
        <span
          className={selectedMapLayer === MapLayer.METROCUADRADO ? activeOption : inactiveOption}
          onClick={() => handleMapLayerChange(MapLayer.METROCUADRADO)}
        >Precio por m²</span>
        <span
          className={selectedMapLayer === MapLayer.DENSIDAD ? activeOption : inactiveOption}
          onClick={() => handleMapLayerChange(MapLayer.DENSIDAD)}
        >Unidades</span>
      </div>
    </Card>
  )
}


export default StatsGeneral