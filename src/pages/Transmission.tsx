import { useEffect, useState } from 'react';
import { Box, Container, SimpleGrid, Table, Title } from '@mantine/core';
import TimeRange from '../model/TimeRange';
import StartEndDatePicker from '../components/chart/StartEndDatePicker';
import useNotification from '../hooks/useNotification';
import useFingridApi from '../hooks/useFingridApi';
import DefaultTimeRange from '../model/DefaultTimeRange';
import { isValidTimeRange } from '../utils/timerangeutils';
import TransmissionBetweenCountriesResponse from '../model/TransmissionBetweenCountriesResponse';
import TitleCard from '../components/common/TitleCard';
import { calcAverage, calcMax, calcMin, formatNumber } from '../utils/numberutils';
import useBreakpoint from '../hooks/useBreakpoint';

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

const mapResponseToCountryValues = (response: TransmissionBetweenCountriesResponse) => {
  const countryValues: TransmissionBetweenCountriesValues = {
    centralSweden: [],
    northernSweden: [],
    norway: [],
    estonia: [],
    russia: [],
  };

  Object.entries(response).forEach((country) => {
    const values = country[1].map(({ value }) => value);
    countryValues[country[0] as keyof TransmissionBetweenCountriesResponse] = values;
  });

  return countryValues;
};

const mapValuesToTableData = (values: TransmissionBetweenCountriesValues) => {
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

function Transmission() {
  const { errorNotification } = useNotification();
  const { getTransmissionBetweenCountries } = useFingridApi();
  const { matchesXs } = useBreakpoint();
  const [timeRange, setTimeRange] = useState<TimeRange>(DefaultTimeRange);
  const [transmissionByCountries, setTransmissionByCountries] =
    useState<TransmissionBetweenCountriesTableData>({
      centralSweden: { min: 0, average: 0, max: 0 },
      northernSweden: { min: 0, average: 0, max: 0 },
      norway: { min: 0, average: 0, max: 0 },
      estonia: { min: 0, average: 0, max: 0 },
      russia: { min: 0, average: 0, max: 0 },
    });

  useEffect(() => {
    (async () => {
      if (isValidTimeRange(timeRange)) {
        try {
          const response = await getTransmissionBetweenCountries(timeRange);

          if (Object.entries(response).length === 0) {
            return errorNotification('Failed to fetch transmission data');
          }

          const values = mapResponseToCountryValues(response);
          const tableData = mapValuesToTableData(values);

          setTransmissionByCountries(tableData);
        } catch (error) {
          errorNotification('Failed to fetch transmission data');
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const getTableRowCountry = (country: [string, CountryTableData]) => (
    <td>{transmissionCountries[country[0] as keyof TransmissionBetweenCountriesValues]}</td>
  );

  const getTableRowCells = (country: [string, CountryTableData]) =>
    Object.values(country[1]).map((num, index) => <td key={index}>{formatNumber(num)}</td>);

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
        <StartEndDatePicker timeRange={timeRange} changeTimeRange={setTimeRange} />
      </Box>
      <SimpleGrid cols={matchesXs ? 1 : 2}>
        <TitleCard
          title="Import/Export"
          description="Positive value means exporting to another country. Negative value means importing to Finland."
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
              {Object.entries(transmissionByCountries).map((country, index) => {
                return (
                  <tr key={index}>
                    {getTableRowCountry(country)}
                    {getTableRowCells(country)}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </TitleCard>
        <TitleCard title="Domestic">
          <></>
        </TitleCard>
      </SimpleGrid>
    </Container>
  );
}

export default Transmission;
