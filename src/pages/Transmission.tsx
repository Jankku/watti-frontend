import { useState } from 'react';
import { Box, Container, List, SimpleGrid, Table, Title } from '@mantine/core';
import TimeRange from '../model/TimeRange';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import defaultTimeRange from '../model/DefaultTimeRange';
import TransmissionBetweenCountriesResponse from '../model/TransmissionBetweenCountriesResponse';
import TitleCard from '../components/common/TitleCard';
import { calcAverage, calcMax, calcMin, formatNumber } from '../utils/numberutils';
import useBreakpoint from '../hooks/useBreakpoint';
import FingridApiResponse from '../model/FingridApiResponse';
import CustomTooltip from '../components/common/CustomTooltip';
import DomesticTransmissionArrows, {
  DomesticTransmissionDirection,
} from '../components/transmission/DomesticTransmissionArrows';
import { mapApiResponseToValues } from '../utils/responseutils';
import { getTransmissionBetweenCountries, getDomesticTransmission } from '../data/fingridApi';
import { useQuery } from '@tanstack/react-query';

const transmissionCountries = {
  centralSweden: 'Central Sweden',
  northernSweden: 'Northern Sweden',
  norway: 'Norway',
  estonia: 'Estonia',
  russia: 'Russia',
};

type TransmissionBetweenCountriesValues = {
  centralSweden: number[];
  northernSweden: number[];
  norway: number[];
  estonia: number[];
  russia: number[];
};

type CountryTableData = {
  min: number;
  average: number;
  max: number;
};

type TransmissionBetweenCountriesTableData = {
  centralSweden: CountryTableData;
  northernSweden: CountryTableData;
  norway: CountryTableData;
  estonia: CountryTableData;
  russia: CountryTableData;
};

export const mapResponseToCountryValues = (response: TransmissionBetweenCountriesResponse) => {
  const countryValues: TransmissionBetweenCountriesValues = {
    centralSweden: [],
    northernSweden: [],
    norway: [],
    estonia: [],
    russia: [],
  };

  Object.entries(response).forEach((country) => {
    const values = mapApiResponseToValues(country[1]);
    countryValues[country[0] as keyof TransmissionBetweenCountriesResponse] = values;
  });

  return countryValues;
};

export const mapValuesToTableData = (values: TransmissionBetweenCountriesValues) => {
  const tableData: TransmissionBetweenCountriesTableData = {
    centralSweden: { min: 0, average: 0, max: 0 },
    northernSweden: { min: 0, average: 0, max: 0 },
    norway: { min: 0, average: 0, max: 0 },
    estonia: { min: 0, average: 0, max: 0 },
    russia: { min: 0, average: 0, max: 0 },
  };

  Object.entries(values).forEach((country) => {
    const min = calcMin(country[1]);
    const average = calcAverage(country[1]);
    const max = calcMax(country[1]);
    tableData[country[0] as keyof TransmissionBetweenCountriesTableData] = { min, average, max };
  });

  return tableData;
};

const getTableRowCountry = (country: [string, CountryTableData]) => (
  <td>{transmissionCountries[country[0] as keyof TransmissionBetweenCountriesValues]}</td>
);

const getTableRowCells = (country: [string, CountryTableData]) =>
  Object.values(country[1]).map((num, index) => <td key={index}>{formatNumber(num)}</td>);

const getDomesticDirection = (data?: FingridApiResponse[]): DomesticTransmissionDirection => {
  if (data === undefined) return null;

  const values = mapApiResponseToValues(data);
  const average = calcAverage(values);
  return average > 0 ? 'south' : 'north';
};

export const transmissionBetweenCountriesInitial: TransmissionBetweenCountriesTableData = {
  centralSweden: { min: 0, average: 0, max: 0 },
  northernSweden: { min: 0, average: 0, max: 0 },
  norway: { min: 0, average: 0, max: 0 },
  estonia: { min: 0, average: 0, max: 0 },
  russia: { min: 0, average: 0, max: 0 },
};

function Transmission() {
  const { errorNotification } = useNotification();
  const { matchesXs } = useBreakpoint();
  const [dateRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

  const domesticTransmissionQuery = useQuery(
    ['transmission', 'domestic', dateRange],
    () => getDomesticTransmission(dateRange),
    {
      onError: () => errorNotification('Failed to fetch transmission data'),
    }
  );

  const transmissionBetweenCountriesQuery = useQuery(
    ['transmission', 'betweenCountries', dateRange],
    () => getTransmissionBetweenCountries(dateRange),
    {
      placeholderData: transmissionBetweenCountriesInitial,
      onError: () => errorNotification('Failed to fetch transmission data'),
    }
  );

  return (
    <Container size={'lg'} p={0}>
      <Title align="center" order={1}>
        Electricity Transmission
      </Title>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'end',
          paddingTop: '1em',
          paddingBottom: '2em',
        }}
      >
        <StartEndDatePicker dateRange={dateRange} changeTimeRange={setTimeRange} />
      </Box>
      <SimpleGrid cols={matchesXs ? 1 : 2}>
        <TitleCard
          title="Import/Export"
          description="Positive (+) value means export. Negative (-) value means import."
        >
          <Table highlightOnHover captionSide="bottom">
            <caption>MWh/h</caption>
            <thead>
              <tr>
                <th>Country</th>
                <th>Min</th>
                <th>Average</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              {transmissionBetweenCountriesQuery?.data
                ? Object.entries(transmissionBetweenCountriesQuery.data).map((country, index) => {
                    return (
                      <tr key={index}>
                        {getTableRowCountry(country)}
                        {getTableRowCells(country)}
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </Table>
        </TitleCard>
        <TitleCard
          title="Domestic transmission"
          description="Up means electricity moves from south to north. Down means north to south."
        >
          <CustomTooltip
            title="Explanation"
            label={
              <List size={'sm'} sx={(theme) => ({ color: theme.other.tooltipTextColor })}>
                <List.Item>Up means electricity moves from south to north.</List.Item>
                <List.Item>Down means north to south.</List.Item>
                <List.Item>Empty means data can&apos;t be found.</List.Item>
              </List>
            }
          >
            <DomesticTransmissionArrows
              direction={getDomesticDirection(domesticTransmissionQuery.data)}
            />
          </CustomTooltip>
        </TitleCard>
      </SimpleGrid>
    </Container>
  );
}

export default Transmission;
