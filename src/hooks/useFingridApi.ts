import axios from '../axios';
import ApiResponse from '../model/ApiResponse';
import TimeRange from '../model/TimeRange';

const getConsumption = async (timeRange: TimeRange) => {
  const { data } = await axios.get<ApiResponse[]>('/proxy/v1/variable/124/events/json', {
    params: timeRange,
  });
  return data;
};

const getProduction = async (timeRange: TimeRange) => {
  const { data } = await axios.get<ApiResponse[]>('/proxy/v1/variable/74/events/json', {
    params: timeRange,
  });
  return data;
};

function useFingridApi() {
  return { getConsumption, getProduction };
}

export default useFingridApi;
