import { useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import TimeRange from '../model/TimeRange';
import ElectricityLineChart from '../components/chart/ElectricityLineChart';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import defaultTimeRange from '../model/DefaultTimeRange';
import StatsGroup from '../components/stats/StatsGroup';
import PushNotificationHandler from '../components/pushnotification/PushNotificationHandler';
import ChartCard from '../components/chart/ChartCard';
import { getTotalConsumption, getTotalConsumptionEmissions } from '../data/fingridApi';
import { useQuery } from '@tanstack/react-query';

function Consumption() {
  const { errorNotification } = useNotification();
  const [dateRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

  const emissionQuery = useQuery(
    ['consumption', 'emission', dateRange],
    () => getTotalConsumptionEmissions(dateRange),
    {
      onError: () => errorNotification('Failed to fetch emission data'),
    }
  );

  const consumptionQuery = useQuery(
    ['consumption', dateRange],
    () => getTotalConsumption(dateRange),
    {
      onError: () => errorNotification('Failed to fetch graph data'),
    }
  );

  return (
    <Container size={'lg'} p={0}>
      <Title align="center" order={1}>
        Electricity Consumption
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

      <StatsGroup data={consumptionQuery.data} emissions={emissionQuery.data} />

      <ChartCard title="Total consumption">
        <ElectricityLineChart data={consumptionQuery.data} />
      </ChartCard>
    </Container>
  );
}

export default Consumption;
