import TimeRange from '../model/TimeRange';

const isValidDateRange = (value: TimeRange): boolean =>
  value.start_time !== 'Invalid Date' && value.end_time !== 'Invalid Date';

export { isValidDateRange };
