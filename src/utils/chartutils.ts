import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import ApiResponse from '../model/ApiResponse';

dayjs.extend(localizedFormat);

type DateTimeLabel = [string, string];
type DateLabel = string;
export type ChartLabelArray = Array<DateLabel | DateTimeLabel>;

function createChartLabels(data: ApiResponse[]): ChartLabelArray {
  const labelType = getChartLabelType(data);
  return labelType === 'date' ? createDateLabels(data) : createDateTimeLabels(data);
}

function createDateLabels(data: ApiResponse[]): ChartLabelArray {
  return data.map(({ start_time }) => dayjs(start_time).format('L'));
}

function createDateTimeLabels(data: ApiResponse[]): ChartLabelArray {
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

function getChartLabelType(data: ApiResponse[]): ChartLabelType {
  const startTimeUnix = data.map(({ start_time }) => dayjs(start_time).unix());
  const endTimeUnix = data.map(({ end_time }) => dayjs(end_time).unix());
  const earliestDate = dayjs(Math.min(...startTimeUnix), 'X');
  const latestDate = dayjs(Math.max(...endTimeUnix), 'X');
  const dateDiff = latestDate.diff(earliestDate, 'day');

  return dateDiff > 5 ? 'date' : 'dateTime';
}

export { createChartLabels };
