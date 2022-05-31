import dayjs from 'dayjs';
import TimeRange from '../model/TimeRange';

const isValidTimeRange = (timeRange: TimeRange): boolean =>
  timeRange.start_time !== 'Invalid Date' && timeRange.end_time !== 'Invalid Date';

const isToday = (value: Date | null): boolean => (value ? dayjs().isSame(value, 'day') : false);

export { isValidTimeRange, isToday };
