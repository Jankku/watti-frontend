import dayjs from 'dayjs';
import axios from '../axios';
import PriceResponse from '../model/PriceResponse';
import TimeRange from '../model/TimeRange';

const getPrice = async (timeRange: TimeRange) => {
  const startDate = dayjs(timeRange.start_time).format('YYYY-MM-DD');
  const endDate = dayjs(timeRange.end_time).format('YYYY-MM-DD');
  const { data } = await axios.get<PriceResponse[]>(`/vattenfall/${startDate}/${endDate}?lang=fi`);
  return data;
};

function useVattenfallApi() {
  return { getPrice };
}

export default useVattenfallApi;
