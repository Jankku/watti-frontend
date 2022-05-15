import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ApiResponse from '../../model/Response';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { createStyles } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useEffect, useState } from 'react';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ConsumptionChartProps = {
  data: ApiResponse[] | undefined;
};

function ConsumptionChart({ data }: ConsumptionChartProps) {
  const { theme } = useStyles();
  const { matchesXs } = useBreakpoint();

  const [type, setType] = useState<'time' | 'date'>('time');
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (data) {
      const chartLabels = data.map(({ start_time }) => dayjs(start_time).format('L'));
      const chartValues = data.map(({ value }) => value);
      setLabels(chartLabels);
      setValues(chartValues);

      const startTimeUnix = data.map(({ start_time }) => dayjs(start_time).unix());
      const endTimeUnix = data.map(({ end_time }) => dayjs(end_time).unix());
      const earliestDate = dayjs(Math.min(...startTimeUnix), 'X');
      const latestDate = dayjs(Math.max(...endTimeUnix), 'X');
      const dateDiff = latestDate.diff(earliestDate, 'day');
      setType(dateDiff >= 1 ? 'date' : 'time');
    }
  }, [data]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'MWh/h',
        data: values,
        borderColor: theme.colors.yellow[8],
        backgroundColor: theme.colors.yellow[7],
      },
    ],
  };

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        aspectRatio: matchesXs ? 1 : 2,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
        },
        scales: {
          x: {
            ticks: {
              sampleSize: 1,
            },
          },
        },
      }}
    />
  );
}

const useStyles = createStyles((theme) => ({}));

export default ConsumptionChart;
