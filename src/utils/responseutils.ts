import FingridApiResponse from '../model/FingridApiResponse';

const mapApiResponseToValues = (response: FingridApiResponse[]) =>
  response.map(({ value }) => value);

export { mapApiResponseToValues };
