import { SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import FingridApiResponse from '../../model/FingridApiResponse';
import { calcAverage } from '../../utils/mathutils';
import StatsCard from './StatsCard';

type Stats = {
  min: number;
  max: number;
  average: number;
};

type StatsGroupProps = {
  data: FingridApiResponse[] | undefined;
};

function StatsGroup({ data }: StatsGroupProps) {
  const [stats, setStats] = useState<Stats>({ min: 0, max: 0, average: 0 });

  useEffect(() => {
    if (!data) return;

    const values = data.map(({ value }) => value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const average = calcAverage(values);

    setStats({
      min,
      max,
      average,
    });
  }, [data]);

  return (
    <SimpleGrid my={40} cols={3}>
      <StatsCard title="Min" value={stats.min} unit={'MWh/h'} />
      <StatsCard title="Average" value={stats.average} unit={'MWh/h'} />
      <StatsCard title="Max" value={stats.max} unit={'MWh/h'} />
    </SimpleGrid>
  );
}

export default StatsGroup;
