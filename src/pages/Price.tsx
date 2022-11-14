import { useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import TimeRange from '../model/TimeRange';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import defaultTimeRange from '../model/DefaultTimeRange';
import PushNotificationHandler from '../components/pushnotification/PushNotificationHandler';
import { getPrice } from '../data/vattenfallApi';
import PriceLineChart from '../components/chart/PriceLineChart';
import ChartCard from '../components/chart/ChartCard';
import { useQuery } from '@tanstack/react-query';

function Price() {
  const { errorNotification } = useNotification();
  const [dateRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

  const { data } = useQuery(['price', dateRange], () => getPrice(dateRange), {
    onError: () => errorNotification('Failed to fetch price data'),
  });

  return (
    <Container size={'lg'} p={0}>
      <Title align="center" order={1}>
        Electricity Price
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

      <ChartCard title="">
        <PriceLineChart data={data} />
      </ChartCard>
    </Container>
  );
}

export default Price;
