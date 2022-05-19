import { useEffect, useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import ApiResponse from '../model/Response';
import axios from '../axios';
import TimeRange from '../model/TimeRange';
import ConsumptionChart from '../components/consumption/ConsumptionChart';
import StartEndDatePicker from '../components/consumption/StartEndDatePicker';
import dayjs from 'dayjs';
import useNotification from '../hooks/useNotification';

function Consumption() {
  const { errorNotification } = useNotification();
  const [consumption, setConsumption] = useState<ApiResponse[] | undefined>(undefined);
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start_time: dayjs().startOf('day').format(),
    end_time: dayjs().startOf('hour').format(),
  });

  const isValidTime = (value: String) => value !== 'Invalid Date';

  useEffect(() => {
    (async () => {
      if (isValidTime(timeRange.start_time) && isValidTime(timeRange.end_time)) {
        try {
          const { data } = await axios.get<ApiResponse[]>('/variable/124/events/json', {
            params: timeRange,
          });
          setConsumption(data);
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
        Electricity Consumption
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
      <ConsumptionChart data={consumption} />
    </Container>
  );
}

export default Consumption;
