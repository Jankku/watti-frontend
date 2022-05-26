import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import useBreakpoint from '../../hooks/useBreakpoint';
import { useEffect, useRef, useState } from 'react';
import {
  ChartLabelArray,
  createPieChartLabels,
  createPieChartValues,
} from '../../utils/chartutils';
import { useMantineTheme } from '@mantine/core';
import ProductionByMethodResponse from '../../model/ProductionByMethodResponse';
import { formatWatts } from '../../utils/wattutils';

dayjs.extend(localizedFormat);
dayjs.extend(customParseFormat);

ChartJS.register(ArcElement, Tooltip);

type ElectricityPieChartProps = {
  data: ProductionByMethodResponse | undefined;
};

function ElectricityPieChart({ data }: ElectricityPieChartProps) {
  const chartRef = useRef(null);
  const { colors, black, fontSizes } = useMantineTheme();
  const { matchesXs } = useBreakpoint();
  const [labels, setLabels] = useState<ChartLabelArray>([]);
  const [values, setValues] = useState<number[]>([]);

  useEffect(() => {
    if (!data) return;

    const values = createPieChartValues(data);
    const labels = createPieChartLabels(data);
    setLabels(labels);
    setValues(values);
  }, [data]);

  return (
    <Pie
      ref={chartRef}
      plugins={[ChartDataLabels, Legend]}
      data={{
        labels: labels,
        datasets: [
          {
            data: values,
            borderColor: colors.gray[6],
            backgroundColor: [colors.red[5], colors.blue[5], colors.blue[2], colors.yellow[5]],
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
          tooltip: {
            enabled: true,
            callbacks: {
              label: (context) => {
                return ` ${context.label}: ${formatWatts(context.raw as number)}`;
              },
            },
          },
          datalabels: {
            color: black,
            formatter: (value) => formatWatts(value),
            font: {
              size: fontSizes.sm,
            },
          },
        },
      }}
    />
  );
}

export default ElectricityPieChart;
