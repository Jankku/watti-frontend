import { useEffect, useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import TimeRange from '../model/TimeRange';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import DefaultTimeRange from '../model/DefaultTimeRange';
import { isValidTimeRange } from '../utils/timerangeutils';
import PushNotificationHandler from '../components/pushnotification/PushNotificationHandler';
import useVattenfallApi from '../hooks/useVattenfallApi';
import PriceResponse from '../model/PriceResponse';
import PriceLineChart from '../components/chart/PriceLineChart';
import ChartCard from '../components/chart/ChartCard';

function Price() {
  const { errorNotification } = useNotification();
  const { getPrice } = useVattenfallApi();
  const [prices, setPrices] = useState<PriceResponse[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>(DefaultTimeRange);

  useEffect(() => {
    (async () => {
      if (isValidTimeRange(timeRange)) {
        try {
          const prices = await getPrice(timeRange);

          if (prices.length === 0) {
            return errorNotification('Failed to fetch price data');
          }

          setPrices(prices);
        } catch (error) {
          errorNotification('Failed to fetch price data');
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <Container size={'lg'} p={0}>
      <Title align="center" order={1}>
        Electricity Price (spot)
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
        <StartEndDatePicker timeRange={timeRange} changeTimeRange={setTimeRange} />
      </Box>

      <ChartCard title="Price in the given time range">
        <PriceLineChart data={prices} />
      </ChartCard>
    </Container>
  );
}

export default Price;
