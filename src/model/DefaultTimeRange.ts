import dayjs from 'dayjs';
import TimeRange from './TimeRange';

const defaultTimeRange: TimeRange = {
  start_time: dayjs().startOf('day').format(),
  end_time: dayjs().startOf('hour').format(),
};

export default defaultTimeRange;
