import FingridApiResponse from '../model/FingridApiResponse';
import PriceResponse from '../model/PriceResponse';

const mapApiResponseToValues = (response: FingridApiResponse[] | PriceResponse[]) =>
  response.map(({ value }) => value);

export { mapApiResponseToValues };
