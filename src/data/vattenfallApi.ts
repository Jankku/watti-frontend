import dayjs from 'dayjs';
import axios from './axios';
import PriceResponse from '../model/PriceResponse';
import TimeRange from '../model/TimeRange';

const getPrice = async (dateRange: TimeRange) => {
  const startDate = dayjs(dateRange.start_time).format('YYYY-MM-DD');
  const endDate = dayjs(dateRange.end_time).format('YYYY-MM-DD');
  const { data } = await axios.get<PriceResponse[]>(`/vattenfall/${startDate}/${endDate}?lang=fi`);
  return data;
};

export { getPrice };
