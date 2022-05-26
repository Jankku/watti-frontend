import FingridApiResponse from './FingridApiResponse';

type ProductionByMethodResponse = {
  nuclear: FingridApiResponse[];
  hydro: FingridApiResponse[];
  wind: FingridApiResponse[];
  solar: FingridApiResponse[];
};

export default ProductionByMethodResponse;
