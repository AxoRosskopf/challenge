import { Dispatch, SetStateAction, useMemo } from 'react';
import { NEIGHBORHOODS } from '../table/utils/text-samples'
import { Card } from '../ui/card'
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from '../ui/combobox'
import StatsRadial from './stats-atoms/radialbar-chart';
import { ChartConfig } from '../ui/chart';
import { useStats } from '@/hooks/use-stats';
import { MapPinIcon, TrendingUpIcon, LandmarkIcon, DollarSignIcon } from 'lucide-react';

const chartConfig = {
    PH: {
        label: 'PH',
        color: "var(--chart-1)"
    },
    casa: {
        label: 'Casa',
        color: "var(--chart-2)"
    },
    departamento: {
        label: 'Departamento',
        color: "var(--chart-3)"
    }
} satisfies ChartConfig;

const StatsSpec = ({ selectedNeighborhood, setSelectedNeighborhood }:
    {
        selectedNeighborhood: string | null;
        setSelectedNeighborhood: Dispatch<SetStateAction<string | null>>
    }) => {
    const { stats, loading } = useStats();
    const selectedData = useMemo(() => {
        if (!selectedNeighborhood) return null;
        return stats[selectedNeighborhood.toLocaleLowerCase()];
    }, [selectedNeighborhood, stats]);

    const neighborhoodBreakdown = useMemo(() => {
        if (!selectedData) return null;
        return [{
            departamento: selectedData.totalApartments,
            casa: selectedData.totalHouses,
            PH: selectedData.totalPenthouses
        }];
    }, [selectedData]);

    return (
        <Card className='min-w-[100%] flex-1 p-4 flex flex-col gap-4 from-card to-muted/30 border-none overflow-hidden'>
            <div className="flex flex-col gap-2">
                <Combobox
                    items={NEIGHBORHOODS}
                    value={selectedNeighborhood}
                    onValueChange={setSelectedNeighborhood}
                >
                    <ComboboxInput placeholder="Seleccionar un barrio..." className="bg-background/50 border-muted-foreground/20 h-9" />
                    <ComboboxContent>
                        <ComboboxEmpty>No se encontraron resultados</ComboboxEmpty>
                        <ComboboxList>
                            {(item) => (
                                <ComboboxItem key={item} value={item}>
                                    {item}
                                </ComboboxItem>
                            )}
                        </ComboboxList>
                    </ComboboxContent>
                </Combobox>
            </div>

            <div className="flex-1 overflow-hidden">
                {selectedNeighborhood && selectedData ? (
                    <div className='h-full animate-in fade-in slide-in-from-bottom-2 duration-500'>
                        <div className="flex flex-row gap-4 h-full items-stretch">
                            <div className="flex flex-col gap-3 w-1/3 h-full">
                                <SmallStatCard
                                    icon={<DollarSignIcon className="w-4 h-4 text-emerald-500" />}
                                    label="Precio Promedio"
                                    value={`USD ${Math.round(selectedData.averagePrice).toLocaleString()}`}
                                    subValue="Promedio barrio"
                                    className="flex-1"
                                />
                                <SmallStatCard
                                    icon={<TrendingUpIcon className="w-4 h-4 text-blue-500" />}
                                    label="Precio x m²"
                                    value={`USD ${Math.round(selectedData.averagePricePerSquareMeter).toLocaleString()}`}
                                    subValue="Valor metro2"
                                    className="flex-1"
                                />
                            </div>

                            <div className="flex-1 bg-background/40 rounded-xl p-3 border border-muted-foreground/10 flex flex-col items-center justify-center">
                                <h4 className="text-[10px] uppercase font-black text-muted-foreground mb-1 flex items-center gap-1 self-start">
                                    <LandmarkIcon className="w-3 h-3" />
                                    Composición
                                </h4>
                                <div className="w-full h-full flex flex-col items-center justify-center overflow-hidden">
                                    <div className="w-full max-w-[250px] flex items-center justify-center">
                                        {neighborhoodBreakdown && (
                                            <StatsRadial
                                                config={chartConfig}
                                                statsData={neighborhoodBreakdown}
                                                title="Unidades"
                                            />
                                        )}
                                    </div>

                                    <div className="w-full flex flex-row justify-around gap-2 -mt-16 px-2 relative z-10">
                                        <LegendItem
                                            label="Depto"
                                            value={selectedData.totalApartments}
                                            color="#ddd6fe"
                                        />
                                        <LegendItem
                                            label="Casa"
                                            value={selectedData.totalHouses}
                                            color="#a78bfa"
                                        />
                                        <LegendItem
                                            label="PH"
                                            value={selectedData.totalPenthouses}
                                            color="#8e6afbff"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground/50 text-center px-6 border-2 border-dashed border-muted-foreground/10 rounded-xl py-6">
                        <TrendingUpIcon className="w-8 h-8 mb-2 opacity-20" />
                        <p className="text-xs leading-relaxed">Seleccioná un barrio para ver métricas detalladas.</p>
                    </div>
                )}
            </div>
        </Card>
    )
}

const LegendItem = ({ label, value, color }: { label: string, value: number, color: string }) => (
    <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
            <span className="text-[10px] font-medium text-muted-foreground uppercase">{label}</span>
        </div>
        <span className="text-xs font-bold text-foreground">{value.toLocaleString()}</span>
    </div>
);

const SmallStatCard = ({ icon, label, value, subValue, className = "" }: {
    icon: React.ReactNode,
    label: string,
    value: string,
    subValue: string,
    className?: string
}) => (
    <div className={`bg-background/60 p-4 rounded-xl border border-muted-foreground/10 flex flex-col justify-center ${className}`}>
        <div className="flex items-center gap-2 mb-2">
            {icon}
            <span className="text-xs font-medium text-muted-foreground">{label}</span>
        </div>
        <div className="text-lg font-bold text-foreground">
            {value}
        </div>
        <div className="text-[10px] text-muted-foreground/70 mt-1">
            {subValue}
        </div>
    </div>
);

export default StatsSpec