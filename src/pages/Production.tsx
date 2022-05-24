import { useEffect, useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import GraphResponse from '../model/GraphResponse';
import TimeRange from '../model/TimeRange';
import ElectricityChart from '../components/chart/ElectricityChart';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import useFingridApi from '../hooks/useFingridApi';
import DefaultTimeRange from '../model/DefaultTimeRange';
import { isValidTime } from '../utils/timerangeutils';
import StatsGroup from '../components/stats/StatsGroup';
import PushNotificationHandler from '../components/pushnotification/PushNotificationHandler';

function Production() {
  const { errorNotification } = useNotification();
  const { getProduction } = useFingridApi();
  const [production, setProduction] = useState<GraphResponse[] | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<TimeRange>(DefaultTimeRange);

  useEffect(() => {
    (async () => {
      if (isValidTime(timeRange.start_time) && isValidTime(timeRange.end_time)) {
        try {
          const data = await getProduction(timeRange);
          if (data.length === 0) return errorNotification('Failed to fetch graph data');

          setProduction(data);
        } catch (error) {
          errorNotification('Failed to fetch graph data');
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  return (
    <Container size={'md'} p={0}>
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
        <StartEndDatePicker timeRange={timeRange} changeTimeRange={setTimeRange} />
      </Box>
      <StatsGroup data={production} />
      <ElectricityChart data={production} />
    </Container>
  );
}

export default Production;
