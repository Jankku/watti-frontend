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
import ElectricityPieChart from '../components/chart/ElectricityPieChart';
import ProductionByMethodResponse from '../model/ProductionByMethodResponse';
import ChartCard from '../components/chart/ChartCard';

function Production() {
  const { errorNotification } = useNotification();
  const { getTotalProduction, getTotalProductionByMethods } = useFingridApi();
  const [production, setProduction] = useState<FingridApiResponse[]>([]);
  const [productionByMethod, setProductionByMethod] = useState<ProductionByMethodResponse>(
    {} as ProductionByMethodResponse
  );
  const [timeRange, setTimeRange] = useState<TimeRange>(DefaultTimeRange);

  useEffect(() => {
    (async () => {
      if (isValidTime(timeRange.start_time) && isValidTime(timeRange.end_time)) {
        try {
          const production = await getTotalProduction(timeRange);
          const productionByMethod = await getTotalProductionByMethods(timeRange);

          if (production.length === 0 || !productionByMethod) {
            return errorNotification('Failed to fetch graph data');
          }

          setProduction(production);
          setProductionByMethod(productionByMethod);
        } catch (error) {
          errorNotification('Failed to fetch graph data');
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

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
        <StartEndDatePicker timeRange={timeRange} changeTimeRange={setTimeRange} />
      </Box>
      <StatsGroup data={production} />
      <ChartCard title="Total production">
        <ElectricityLineChart data={production} />
      </ChartCard>

      <ChartCard title="Total production by method">
        <ElectricityPieChart data={productionByMethod} />
      </ChartCard>
    </Container>
  );
}

export default Production;
