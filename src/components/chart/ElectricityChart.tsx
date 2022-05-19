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
import ApiResponse from '../../model/ApiResponse';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { ChartLabelArray, createChartLabels } from '../../utils/chartutils';
import { useMantineTheme } from '@mantine/core';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ConsumptionChartProps = {
  data: ApiResponse[] | undefined;
};

function ConsumptionChart({ data }: ConsumptionChartProps) {
  const { colors } = useMantineTheme();
  const { matchesXs } = useBreakpoint();
  const [labels, setLabels] = useState<ChartLabelArray>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (!data) return;

    const chartLabels = createChartLabels(data);
    const chartValues = data.map(({ value }) => value);
    setLabels(chartLabels);
    setValues(chartValues);
  }, [data]);

  return (
    <Line
      data={{
        labels: labels,
        datasets: [
          {
            label: 'MWh/h',
            data: values,
            borderColor: colors.yellow[8],
            backgroundColor: colors.yellow[7],
          },
        ],
      }}
      options={{
        responsive: true,
        aspectRatio: matchesXs ? 1 : 2,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
        },
      }}
    />
  );
}

export default ConsumptionChart;
