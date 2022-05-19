import { useEffect, useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import ApiResponse from '../model/Response';
import axios from '../axios';
import TimeRange from '../model/TimeRange';
import ElectricityChart from '../components/chart/ElectricityChart';
import StartEndDatePicker from '../components/common/StartEndDatePicker';
import dayjs from 'dayjs';
import useNotification from '../hooks/useNotification';

function Production() {
  const { errorNotification } = useNotification();
  const [production, setProduction] = useState<ApiResponse[] | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start_time: dayjs().startOf('day').format(),
    end_time: dayjs().startOf('hour').format(),
  });

  const isValidTime = (value: String) => value !== 'Invalid Date';

  useEffect(() => {
    (async () => {
      if (isValidTime(timeRange.start_time) && isValidTime(timeRange.end_time)) {
        try {
          const { data } = await axios.get<ApiResponse[]>('/variable/74/events/json', {
            params: timeRange,
          });
          setProduction(data);
        } catch (error) {
          errorNotification(`Failed to fetch graph data`);
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
          paddingTop: '1em',
        }}
      >
        <StartEndDatePicker timeRange={timeRange} changeTimeRange={setTimeRange} />
      </Box>
      <ElectricityChart data={production} />
    </Container>
  );
}

export default Production;
