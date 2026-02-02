"use client"
import StatsGeneral from '@/components/molecules/stats-general';
import StatsSpec from '@/components/molecules/stats-spec';
import { Skeleton } from '@/components/ui/skeleton';
import { MapLayer } from '@/types/map';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Map = dynamic(() => import('@/components/molecules/map'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-full " />
});

export default function Home() {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string | null>(null);
  const [selectedMapLayer, setSelectedMapLayer] = useState<MapLayer>(MapLayer.PROMEDIO);
  return (
    <div className="w-full h-full p-6 flex flex-row gap-6">
      <div className='flex flex-col w-[50%] h-full gap-6'>
        <StatsGeneral
          selectedMapLayer={selectedMapLayer}
          setSelectedMapLayer={setSelectedMapLayer}
        />
        <StatsSpec
          selectedNeighborhood={selectedNeighborhood}
          setSelectedNeighborhood={setSelectedNeighborhood}
        />
      </div>
      <Map
        selectedNeighborhood={selectedNeighborhood}
        setSelectedNeighborhood={setSelectedNeighborhood}
        selectedMapLayer={selectedMapLayer}
        setSelectedMapLayer={setSelectedMapLayer}
      />
    </div>
  );
}
