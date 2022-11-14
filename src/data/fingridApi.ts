import axios from './axios';
import { gridStates } from '../components/gridstate/GridState';
import FingridApiResponse from '../model/FingridApiResponse';
import GridStateItem from '../model/GridStateItem';
import ProductionByMethodResponse from '../model/ProductionByMethodResponse';
import TimeRange from '../model/TimeRange';
import TransmissionBetweenCountriesResponse from '../model/TransmissionBetweenCountriesResponse';
import {
  mapResponseToCountryValues,
  mapValuesToTableData,
  transmissionBetweenCountriesInitial,
} from '../pages/Transmission';

const get = async (variableId: number, dateRange: TimeRange) => {
  const { data } = await axios.get<FingridApiResponse[]>(
    `/fingrid/v1/variable/${variableId}/events/json`,
    {
      params: dateRange,
    }
  );
  return data;
};

const getTotalConsumption = async (dateRange: TimeRange) => await get(124, dateRange);
const getTotalConsumptionEmissions = async (dateRange: TimeRange) => await get(265, dateRange);

const getProductionSurplus = async (dateRange: TimeRange) => await get(198, dateRange);
const getTotalProduction = async (dateRange: TimeRange) => await get(74, dateRange);
const getTotalProductionEmissions = async (dateRange: TimeRange) => await get(266, dateRange);
const getTotalProductionByMethods = async (dateRange: TimeRange) => {
  const responses = await Promise.all([
    get(188, dateRange), // Nuclear
    get(191, dateRange), // Hydro
    get(181, dateRange), // Wind
    get(248, dateRange), // Solar
  ]);

  const response: ProductionByMethodResponse = {
    nuclear: responses[0],
    hydro: responses[1],
    wind: responses[2],
    solar: responses[3],
  };

  return response;
};

const getGridState = async (dateRange: TimeRange): Promise<GridStateItem> => {
  const res = await get(209, dateRange);
  const latestStateId = res.at(-1)?.value;
  const currentState = gridStates.find((state) => state.id === latestStateId);
  return currentState ?? gridStates[5];
};

const getDomesticTransmission = async (dateRange: TimeRange): Promise<FingridApiResponse[]> => {
  const res = await get(30, dateRange);
  return res;
};

const getTransmissionBetweenCountries = async (dateRange: TimeRange) => {
  const responses = await Promise.all([
    get(61, dateRange), // Central Sweden
    get(60, dateRange), // Northern Sweden
    get(57, dateRange), // Norway
    get(55, dateRange), // Estonia
    get(58, dateRange), // Russia
  ]);

  const response: TransmissionBetweenCountriesResponse = {
    centralSweden: responses[0],
    northernSweden: responses[1],
    norway: responses[2],
    estonia: responses[3],
    russia: responses[4],
  };

  const values = mapResponseToCountryValues(response);
  const tableData = mapValuesToTableData(values);

  return tableData ?? transmissionBetweenCountriesInitial;
};

export {
  getDomesticTransmission,
  getTransmissionBetweenCountries,
  getTotalProduction,
  getTotalProductionByMethods,
  getTotalProductionEmissions,
  getProductionSurplus,
  getTotalConsumption,
  getTotalConsumptionEmissions,
  getGridState,
};
