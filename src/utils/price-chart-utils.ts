import dayjs from 'dayjs';
import PriceResponse from '../model/PriceResponse';
import { ChartLabelArray } from './electricity-chart-utils';
import { mapApiResponseToValues } from './responseutils';

function createPriceChartValues(data: PriceResponse[]): number[] {
  return mapApiResponseToValues(data);
}

function createPriceChartLabels(data: PriceResponse[]): ChartLabelArray {
  const labelType = getLineChartLabelType(data);
  return labelType === 'date' ? createDateLabels(data) : createDateTimeLabels(data);
}

function createDateLabels(data: PriceResponse[]): ChartLabelArray {
  return data.map(({ timeStamp }) => dayjs(timeStamp).format('L'));
}

function createDateTimeLabels(data: PriceResponse[]): ChartLabelArray {
  const startTimes = data.map(({ timeStamp }) => timeStamp);
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

function getLineChartLabelType(data: PriceResponse[]): ChartLabelType {
  const unixTimes = data.map(({ timeStamp }) => dayjs(timeStamp).unix());
  const earliestDate = dayjs(Math.min(...unixTimes), 'X');
  const latestDate = dayjs(Math.max(...unixTimes), 'X');
  const dateDiff = latestDate.diff(earliestDate, 'day');

  return dateDiff > 5 ? 'date' : 'dateTime';
}

export { createPriceChartLabels, createPriceChartValues };
