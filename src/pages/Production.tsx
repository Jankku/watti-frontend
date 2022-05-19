import { useEffect, useState } from 'react';
import { Box, Container, Title } from '@mantine/core';
import ApiResponse from '../model/ApiResponse';
import TimeRange from '../model/TimeRange';
import ElectricityChart from '../components/chart/ElectricityChart';
import StartEndDatePicker from '../components/common/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import useFingridApi from '../hooks/useFingridApi';
import DefaultTimeRange from '../model/DefaultTimeRange';
import { isValidTime } from '../utils/timerangeutils';

function Production() {
  const { errorNotification } = useNotification();
  const { getProduction } = useFingridApi();
  const [production, setProduction] = useState<ApiResponse[] | undefined>(undefined);
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
