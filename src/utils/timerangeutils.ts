import TimeRange from '../model/TimeRange';

const isValidTimeRange = (timeRange: TimeRange): boolean =>
  timeRange.start_time !== 'Invalid Date' && timeRange.end_time !== 'Invalid Date';

export { isValidTimeRange };
