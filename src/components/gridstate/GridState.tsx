import { Box, ColorSwatch, Title, Tooltip, useMantineTheme } from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import useFingridApi from '../../hooks/useFingridApi';
import useNotification from '../../hooks/useNotification';
import GridStateItem from '../../model/GridStateItem';
import TimeRange from '../../model/TimeRange';

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
    color: 'black',
    description: 'An extremely serious disturbance or a wide black out.',
  },
  {
    id: 5,
    name: 'Restored',
    color: 'blue',
    description:
      'The network is being restored after an extremely serious disturbance or a wide blackout.',
  },
];

function GridState() {
  const theme = useMantineTheme();
  const { getSystemState } = useFingridApi();
  const { errorNotification } = useNotification();
  const [state, setState] = useState<GridStateItem>(possibleStates[0]);

  const timeRange: TimeRange = {
    start_time: dayjs().startOf('hour').format(),
    end_time: dayjs().endOf('hour').format(),
  };

  const possibleColorSwatches = [
    <ColorSwatch key={'green'} color={theme.colors['green'][6]} size={20} />,
    <ColorSwatch key={'yellow'} color={theme.colors['yellow'][6]} size={20} />,
    <ColorSwatch key={'red'} color={theme.colors['red'][6]} size={20} />,
    <ColorSwatch key={'black'} color={theme.black} size={20} />,
    <ColorSwatch key={'blue'} color={theme.colors['blue'][6]} size={20} />,
  ];

  useEffect(() => {
    (async () => {
      try {
        const res = await getSystemState(timeRange);
        const latestItemId = res[res.length - 1].value;
        const currentState =
          possibleStates.find((item) => item.id === latestItemId) || possibleStates[0];
        setState(currentState);
      } catch (error) {
        errorNotification('Failed to fetch grid status.');
      }
    })();
  }, []);

  return (
    <Tooltip wrapLines width={200} withArrow label={state.description} closeDelay={1500}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {possibleColorSwatches[state.id - 1]}{' '}
        <Title order={5} px={4}>
          {state.name}
        </Title>
      </Box>
    </Tooltip>
  );
}

export default GridState;
