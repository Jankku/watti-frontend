import { Box, ColorSwatch, MediaQuery, Title, useMantineTheme } from '@mantine/core';
import dayjs from 'dayjs';
import GridStateItem from '../../model/GridStateItem';
import TimeRange from '../../model/TimeRange';
import CustomTooltip from '../common/CustomTooltip';
import { getGridState } from '../../data/fingridApi';
import { useQuery } from '@tanstack/react-query';

export const gridStates: GridStateItem[] = [
  {
    id: 1,
    name: 'Normal',
    color: 'green',
    description: 'Power system is in normal state.',
  },
  {
    id: 2,
    name: 'Endangered',
    color: 'yellow',
    description:
      "Power system is in endangered state. The adequacy of the electricity is endangered or the power system doesn't fulfill the security standards.",
  },
  {
    id: 3,
    name: 'Disturbed',
    color: 'red',
    description:
      'Power system is in disturbed state. Load shedding has happened in order to keep the adequacy and security of the power system or there is a remarkable risk to a wide black out.',
  },
  {
    id: 4,
    name: 'Black out',
    color: 'dark',
    description: 'An extremely serious disturbance or a wide black out.',
  },
  {
    id: 5,
    name: 'Restoring',
    color: 'blue',
    description:
      'Power system is being restored after an extremely serious disturbance or a wide blackout.',
  },
  {
    id: 6,
    name: 'Unavailable',
    color: 'gray',
    description: "I have no idea what's the current state.",
  },
];

const dateRange: TimeRange = {
  start_time: dayjs().startOf('hour').format(),
  end_time: dayjs().endOf('hour').format(),
};

function GridState() {
  const { colors, other } = useMantineTheme();
  const { data } = useQuery(['gridState', dateRange], () => getGridState(dateRange), {
    placeholderData: gridStates[5],
  });

  const color = data?.color ? colors[data.color][6] : colors['gray'][6];

  return (
    <CustomTooltip title="Grid status" label={data?.description} width={120}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ColorSwatch key={data?.color} color={color} size={20} />

        <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
          <Title order={5} px={4} color={other.headerTextColor}>
            {data?.name}
          </Title>
        </MediaQuery>
      </Box>
    </CustomTooltip>
  );
}

export default GridState;
