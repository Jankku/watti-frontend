import axios from '../axios';
import FingridApiResponse from '../model/FingridApiResponse';
import ProductionByMethodResponse from '../model/ProductionByMethodResponse';
import TimeRange from '../model/TimeRange';

const get = async (variableId: number, timeRange: TimeRange) => {
  const { data } = await axios.get<FingridApiResponse[]>(
    `/fingrid/v1/variable/${variableId}/events/json`,
    {
      params: timeRange,
    }
  );
  return data;
};

const getTotalConsumption = async (timeRange: TimeRange) => await get(124, timeRange);

const getTotalProduction = async (timeRange: TimeRange) => await get(74, timeRange);

const getNuclearProduction = async (timeRange: TimeRange) => await get(188, timeRange);

const getHydroProduction = async (timeRange: TimeRange) => await get(191, timeRange);

const getWindProduction = async (timeRange: TimeRange) => await get(181, timeRange);

const getSolarProduction = async (timeRange: TimeRange) => await get(248, timeRange);

const getSystemState = async (timeRange: TimeRange) => await get(209, timeRange);

const getTotalProductionByMethods = async (timeRange: TimeRange) => {
  const responses = await Promise.all([
    getNuclearProduction(timeRange),
    getHydroProduction(timeRange),
    getWindProduction(timeRange),
    getSolarProduction(timeRange),
  ]);

  const response: ProductionByMethodResponse = {
    nuclear: responses[0],
    hydro: responses[1],
    wind: responses[2],
    solar: responses[3],
  };

  return response;
};

function useFingridApi() {
  return { getTotalConsumption, getTotalProductionByMethods, getTotalProduction, getSystemState };
}

export default useFingridApi;
