import { SimpleGrid } from '@mantine/core';
import { useEffect, useState } from 'react';
import useBreakpoint from '../../hooks/useBreakpoint';
import FingridApiResponse from '../../model/FingridApiResponse';
import { calcAverage, calcMax, calcMin, formatNumber } from '../../utils/numberutils';
import StatsCard from './StatsCard';

type Stats = {
  min: number;
  max: number;
  average: number;
  emissions: number;
};

type StatsGroupProps = {
  data: FingridApiResponse[] | undefined;
  emissions: FingridApiResponse[] | undefined;
};

function StatsGroup({ data, emissions }: StatsGroupProps) {
  const { matchesXs } = useBreakpoint();
  const [stats, setStats] = useState<Stats>({ min: 0, max: 0, average: 0, emissions: 0 });

  useEffect(() => {
    if (!data || data.length === 0) return;

    const values = data.map(({ value }) => value);
    const min = calcMin(values);
    const max = calcMax(values);
    const average = calcAverage(values);

    setStats((stats) => {
      return { ...stats, min, max, average };
    });
  }, [data]);

  useEffect(() => {
    if (!emissions || emissions.length === 0) return;

    const emissionValues = emissions.map(({ value }) => value);
    const avgEmissions = calcAverage(emissionValues);

    setStats((stats) => {
      return {
        ...stats,
        emissions: avgEmissions,
      };
    });
  }, [emissions]);

  return (
    <SimpleGrid my={40} cols={matchesXs ? 2 : 4}>
      <StatsCard title="Min" value={formatNumber(stats.min)} unit={'MWh/h'} />
      <StatsCard title="Average" value={formatNumber(stats.average)} unit={'MWh/h'} />
      <StatsCard title="Max" value={formatNumber(stats.max)} unit={'MWh/h'} />
      <StatsCard title="Emissions" value={formatNumber(stats.emissions)} unit={'gCO2/kWh'} />
    </SimpleGrid>
  );
}

export default StatsGroup;
