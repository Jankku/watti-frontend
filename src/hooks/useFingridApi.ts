import axios from '../axios';
import ApiResponse from '../model/Response';
import TimeRange from '../model/TimeRange';

const getConsumption = async (timeRange: TimeRange) => {
  const { data } = await axios.get<ApiResponse[]>('/variable/124/events/json', {
    params: timeRange,
  });
  return data;
};

const getProduction = async (timeRange: TimeRange) => {
  const { data } = await axios.get<ApiResponse[]>('/variable/74/events/json', {
    params: timeRange,
  });
  return data;
};

function useFingridApi() {
  return { getConsumption, getProduction };
}

export default useFingridApi;
