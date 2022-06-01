import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import FingridApiResponse from '../model/FingridApiResponse';
import ProductionByMethodResponse from '../model/ProductionByMethodResponse';
import { mapApiResponseToValues } from './responseutils';

dayjs.extend(localizedFormat);

/**
 * LINE CHART FUNCTIONS
 */

type DateTimeLabel = [string, string];
type DateLabel = string;
export type ChartLabelArray = Array<DateLabel | DateTimeLabel>;

function createLineChartLabels(data: FingridApiResponse[]): ChartLabelArray {
  const labelType = getLineChartLabels(data);
  return labelType === 'date' ? createDateLabels(data) : createDateTimeLabels(data);
}

function createDateLabels(data: FingridApiResponse[]): ChartLabelArray {
  return data.map(({ start_time }) => dayjs(start_time).format('L'));
}

function createDateTimeLabels(data: FingridApiResponse[]): ChartLabelArray {
  const startTimes = data.map(({ start_time }) => start_time);
  const labels: ChartLabelArray = [];
  let currentDay = '';

  startTimes.forEach((startTime) => {
    const day = dayjs(startTime).format('L');
    const hour = dayjs(startTime).format('HH:mm');

    if (day !== currentDay) {
      labels.push([day, hour]);
      currentDay = day;
    } else {
      labels.push(hour);
    }
  });

  return labels;
}

type ChartLabelType = 'date' | 'dateTime';

function getLineChartLabels(data: FingridApiResponse[]): ChartLabelType {
  const startTimeUnix = data.map(({ start_time }) => dayjs(start_time).unix());
  const endTimeUnix = data.map(({ end_time }) => dayjs(end_time).unix());
  const earliestDate = dayjs(Math.min(...startTimeUnix), 'X');
  const latestDate = dayjs(Math.max(...endTimeUnix), 'X');
  const dateDiff = latestDate.diff(earliestDate, 'day');

  return dateDiff > 5 ? 'date' : 'dateTime';
}

/**
 * PIE CHART FUNCTIONS
 */

type ProductionByMethodConverted = {
  nuclear: number[];
  hydro: number[];
  wind: number[];
  solar: number[];
};

const createPieChartValues = (data: ProductionByMethodResponse): number[] => {
  const results: ProductionByMethodConverted = {
    nuclear: [],
    hydro: [],
    wind: [],
    solar: [],
  };

  for (const [key, response] of Object.entries(data)) {
    const values = mapApiResponseToValues(response);
    const valueSum = values.reduce((prev, next) => prev + next, 0);
    results[key as keyof ProductionByMethodResponse].push(valueSum);
  }

  const flattenedResults = Object.values(results).flatMap((value) => value);

  return flattenedResults;
};

const createPieChartLabels = (data: ProductionByMethodResponse) =>
  Object.keys(data).map((label) => label.charAt(0).toUpperCase() + label.slice(1));

export { createLineChartLabels, createPieChartValues, createPieChartLabels };
