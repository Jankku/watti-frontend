import { Box, ColorSwatch, Title, useMantineTheme } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import useFingridApi from '../../hooks/useFingridApi';
import GridStateItem from '../../model/GridStateItem';
import TimeRange from '../../model/TimeRange';
import GridstateTooltip from './GridStateTooltip';

const possibleStates: GridStateItem[] = [
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

function GridState() {
  const { colors } = useMantineTheme();
  const { getSystemState } = useFingridApi();
  const [state, setState] = useState<GridStateItem>(possibleStates[5]);

  const timeRange: TimeRange = {
    start_time: dayjs().startOf('hour').format(),
    end_time: dayjs().endOf('hour').format(),
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getSystemState(timeRange);
        const latestItemId = res.at(-1)?.value;
        const currentState = possibleStates.find((item) => item.id === latestItemId);
        currentState && setState(currentState);
      } catch {
        console.error('Failed to get grid status');
      }
    })();
  }, []);

  return (
    <GridstateTooltip description={state.description}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ColorSwatch key={state.color} color={colors[state.color][6]} size={20} />
        <Title order={5} px={4}>
          {state.name}
        </Title>
      </Box>
    </GridstateTooltip>
  );
}

export default GridState;
