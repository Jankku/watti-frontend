import { useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import TimeRange from '../model/TimeRange';
import ElectricityLineChart from '../components/chart/ElectricityLineChart';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import defaultTimeRange from '../model/DefaultTimeRange';
import StatsGroup from '../components/stats/StatsGroup';
import PushNotificationHandler from '../components/pushnotification/PushNotificationHandler';
import ElectricityPieChart from '../components/chart/ElectricityPieChart';
import ChartCard from '../components/chart/ChartCard';
import { useQuery } from '@tanstack/react-query';
import {
  getTotalProduction,
  getTotalProductionByMethods,
  getTotalProductionEmissions,
} from '../data/fingridApi';

function Production() {
  const { errorNotification } = useNotification();
  const [dateRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

  const emissionQuery = useQuery(
    ['production', 'emission', dateRange],
    () => getTotalProductionEmissions(dateRange),
    {
      onError: () => errorNotification('Failed to fetch emission data'),
    }
  );

  const productionQuery = useQuery(['production', dateRange], () => getTotalProduction(dateRange), {
    onError: () => errorNotification('Failed to fetch production data'),
  });

  const productionByMethodQuery = useQuery(
    ['production', 'byMethod', dateRange],
    () => getTotalProductionByMethods(dateRange),
    {
      onError: () => errorNotification('Failed to fetch production data'),
    }
  );

  return (
    <Container size={'lg'} p={0}>
      <Title align="center" order={1}>
        Electricity Production
      </Title>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'end',
          paddingTop: '1em',
        }}
      >
        <PushNotificationHandler />
        <StartEndDatePicker dateRange={dateRange} changeTimeRange={setTimeRange} />
      </Box>

      <StatsGroup data={productionQuery.data} emissions={emissionQuery.data} />

      <ChartCard title="Total production">
        <ElectricityLineChart data={productionQuery.data} />
      </ChartCard>

      <ChartCard title="Total production by method">
        <ElectricityPieChart data={productionByMethodQuery.data} />
      </ChartCard>
    </Container>
  );
}

export default Production;
