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
import FingridApiResponse from '../../model/FingridApiResponse';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { ChartLabelArray, createLineChartLabels } from '../../utils/chartutils';
import { useMantineTheme } from '@mantine/core';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ConsumptionChartProps = {
  data: FingridApiResponse[] | undefined;
};

function ConsumptionChart({ data }: ConsumptionChartProps) {
  const { colors } = useMantineTheme();
  const { matchesXs } = useBreakpoint();
  const [labels, setLabels] = useState<ChartLabelArray>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (!data) return;

    const chartLabels = createLineChartLabels(data);
    const chartValues = data.map(({ value }) => value);
    setLabels(chartLabels);
    setValues(chartValues);
  }, [data]);

  return (
    <Line
      plugins={[CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend]}
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
        scales: {
          x: {
            ticks: {},
          },
          y: {
            beginAtZero: true,
            suggestedMax: Math.max(...values) + 1000,
          },
        },
        aspectRatio: matchesXs ? 1 : 2.5,
        plugins: {
          legend: {
            position: 'bottom' as const,
          },
          tooltip: {
            callbacks: {
              label: (context) => `${new Intl.NumberFormat('en-US').format(context.raw as number)}`,
              afterLabel: () => 'Mwh/h',
            },
          },
        },
      }}
    />
  );
}

export default ConsumptionChart;
