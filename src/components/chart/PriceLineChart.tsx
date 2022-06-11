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
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useEffect, useState } from 'react';
import { ChartLabelArray } from '../../utils/electricity-chart-utils';
import { useMantineTheme } from '@mantine/core';
import { formatNumber } from '../../utils/numberutils';
import PriceResponse from '../../model/PriceResponse';
import { createPriceChartLabels, createPriceChartValues } from '../../utils/price-chart-utils';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PriceLineChartProps = {
  data: PriceResponse[] | undefined;
};

function PriceLineChart({ data }: PriceLineChartProps) {
  const { colors, colorScheme } = useMantineTheme();
  const { matchesXs } = useBreakpoint();
  const [labels, setLabels] = useState<ChartLabelArray>([]);
  const [values, setValues] = useState<number[]>([]);
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    if (!data) return;

    const chartValues = createPriceChartValues(data);
    setValues(chartValues);

    const chartLabels = createPriceChartLabels(data);
    setLabels(chartLabels);
  }, [data]);

  return (
    <Line
      plugins={[CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend]}
      data={{
        labels: labels,
        datasets: [
          {
            label: 'cent/kWh',
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
              color: isDark ? colors.dark[0] : colors.dark[9],
            },
            grid: {
              color: isDark ? colors.dark[3] : colors.gray[3],
            },
          },
          y: {
            ticks: {
              color: isDark ? colors.dark[0] : colors.dark[9],
            },
            grid: {
              color: isDark ? colors.dark[3] : colors.gray[3],
            },
            beginAtZero: true,
            suggestedMax: Math.max(...values) + 5,
          },
        },
        aspectRatio: matchesXs ? 1 : 2.5,
        plugins: {
          legend: {
            position: 'bottom' as const,
            labels: {
              color: isDark ? colors.dark[0] : colors.dark[9],
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => `${formatNumber(context.raw as number, 2)}`,
              afterLabel: () => 'cent/kWh',
            },
          },
        },
      }}
    />
  );
}

export default PriceLineChart;
