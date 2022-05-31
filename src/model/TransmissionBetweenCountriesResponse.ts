import FingridApiResponse from './FingridApiResponse';

type TransmissionBetweenCountriesResponse = {
  centralSweden: FingridApiResponse[];
  northernSweden: FingridApiResponse[];
  norway: FingridApiResponse[];
  estonia: FingridApiResponse[];
  russia: FingridApiResponse[];
};

export default TransmissionBetweenCountriesResponse;
