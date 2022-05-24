import axios from '../axios';
import GraphResponse from '../model/GraphResponse';
import TimeRange from '../model/TimeRange';

const getConsumption = async (timeRange: TimeRange) => {
  const { data } = await axios.get<GraphResponse[]>('/proxy/v1/variable/124/events/json', {
    params: timeRange,
  });
  return data;
};

const getProduction = async (timeRange: TimeRange) => {
  const { data } = await axios.get<GraphResponse[]>('/proxy/v1/variable/74/events/json', {
    params: timeRange,
  });
  return data;
};

const getSystemState = async (timeRange: TimeRange) => {
  const { data } = await axios.get<GraphResponse[]>('/proxy/v1/variable/209/events/json', {
    params: timeRange,
  });
  return data;
};

function useFingridApi() {
  return { getConsumption, getProduction, getSystemState };
}

export default useFingridApi;
