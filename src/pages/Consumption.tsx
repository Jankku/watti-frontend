import { useEffect, useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import FingridApiResponse from '../model/FingridApiResponse';
import TimeRange from '../model/TimeRange';
import ElectricityLineChart from '../components/chart/ElectricityLineChart';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import useFingridApi from '../hooks/useFingridApi';
import DefaultTimeRange from '../model/DefaultTimeRange';
import { isValidTime } from '../utils/timerangeutils';
import StatsGroup from '../components/stats/StatsGroup';
import PushNotificationHandler from '../components/pushnotification/PushNotificationHandler';
import ChartCard from '../components/chart/ChartCard';

function Consumption() {
  const { errorNotification } = useNotification();
  const { getTotalConsumption } = useFingridApi();
  const [consumption, setConsumption] = useState<FingridApiResponse[]>([]);
  const [timeRange, setTimeRange] = useState<TimeRange>(DefaultTimeRange);

  useEffect(() => {
    (async () => {
      if (isValidTime(timeRange.start_time) && isValidTime(timeRange.end_time)) {
        try {
          const consumption = await getTotalConsumption(timeRange);
          if (consumption.length === 0)
            return errorNotification('Failed to fetch graph consumption');

          setConsumption(consumption);
        } catch (error) {
          errorNotification('Failed to fetch graph consumption');
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

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
        <StartEndDatePicker timeRange={timeRange} changeTimeRange={setTimeRange} />
      </Box>
      <StatsGroup data={consumption} />
      <ChartCard title="Total consumption">
        <ElectricityLineChart data={consumption} />
      </ChartCard>
    </Container>
  );
}

export default Consumption;
