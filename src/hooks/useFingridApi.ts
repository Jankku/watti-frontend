import axios from '../axios';
import FingridApiResponse from '../model/FingridApiResponse';
import ProductionByMethodResponse from '../model/ProductionByMethodResponse';
import TimeRange from '../model/TimeRange';
import TransmissionBetweenCountriesResponse from '../model/TransmissionBetweenCountriesResponse';

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
const getTotalConsumptionEmissions = async (timeRange: TimeRange) => await get(265, timeRange);

const getProductionSurplus = async (timeRange: TimeRange) => await get(198, timeRange);
const getTotalProduction = async (timeRange: TimeRange) => await get(74, timeRange);
const getTotalProductionEmissions = async (timeRange: TimeRange) => await get(266, timeRange);
const getTotalProductionByMethods = async (timeRange: TimeRange) => {
  const responses = await Promise.all([
    get(188, timeRange), // Nuclear
    get(191, timeRange), // Hydro
    get(181, timeRange), // Wind
    get(248, timeRange), // Solar
  ]);

  const response: ProductionByMethodResponse = {
    nuclear: responses[0],
    hydro: responses[1],
    wind: responses[2],
    solar: responses[3],
  };

  return response;
};

const getSystemState = async (timeRange: TimeRange) => await get(209, timeRange);

const getDomesticTransmission = async (timeRange: TimeRange) => await get(30, timeRange);
const getTransmissionBetweenCountries = async (timeRange: TimeRange) => {
  const responses = await Promise.all([
    get(61, timeRange), // Central Sweden
    get(60, timeRange), // Northern Sweden
    get(57, timeRange), // Norway
    get(55, timeRange), // Estonia
    get(58, timeRange), // Russia
  ]);

  const response: TransmissionBetweenCountriesResponse = {
    centralSweden: responses[0],
    northernSweden: responses[1],
    norway: responses[2],
    estonia: responses[3],
    russia: responses[4],
  };

  return response;
};

function useFingridApi() {
  return {
    getDomesticTransmission,
    getTransmissionBetweenCountries,
    getTotalProduction,
    getTotalProductionByMethods,
    getTotalProductionEmissions,
    getProductionSurplus,
    getTotalConsumption,
    getTotalConsumptionEmissions,
    getSystemState,
  };
}

export default useFingridApi;
