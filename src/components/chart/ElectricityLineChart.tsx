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
import { ChartLabelArray, createLineChartLabels } from '../../utils/electricity-chart-utils';
import { useMantineTheme } from '@mantine/core';
import { formatNumber } from '../../utils/numberutils';
import { mapApiResponseToValues } from '../../utils/responseutils';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type ElectricityLineChartProps = {
  data: FingridApiResponse[] | undefined;
};

function ElectricityLineChart({ data }: ElectricityLineChartProps) {
  const { colors, other, colorScheme } = useMantineTheme();
  const { matchesXs } = useBreakpoint();
  const [labels, setLabels] = useState<ChartLabelArray>([]);
  const [values, setValues] = useState<number[]>([]);
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!data) return;

    const chartLabels = createLineChartLabels(data);
    setLabels(chartLabels);

    const chartValues = mapApiResponseToValues(data);
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
            borderColor: isDark ? colors.orange[4] : colors.yellow[8],
            backgroundColor: isDark ? colors.orange[4] : colors.yellow[7],
          },
        ],
      }}
      options={{
        responsive: true,
        line: {
          datasets: {
            borderColor: colors.dark[0],
          },
        },
        scales: {
          x: {
            ticks: {
              color: other.textColor,
            },
            grid: {
              color: isDark ? colors.dark[3] : colors.gray[3],
            },
          },
          y: {
            ticks: {
              color: other.textColor,
            },
            grid: {
              color: isDark ? colors.dark[3] : colors.gray[3],
            },
            beginAtZero: true,
            suggestedMax: Math.max(...values) + 1000,
          },
        },
        aspectRatio: matchesXs ? 1 : 2.5,
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              color: other.textColor,
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${formatNumber(context.raw as number)}`,
              afterLabel: () => 'Mwh/h',
            },
          },
        },
      }}
    />
  );
}

export default ElectricityLineChart;
