import { Box, Card, useMantineTheme } from '@mantine/core';
import { ArrowNarrowDown, ArrowNarrowUp } from 'tabler-icons-react';

export type DomesticTransmissionDirections = 'north' | 'south' | null;

type DomesticTransmissionArrowsProps = {
  direction: DomesticTransmissionDirections;
};

const getArrows = (leftColor: string, rightColor: string) => {
  return (
    <Card
      withBorder
      sx={{
        width: 'min-content',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          height: '5em',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            top: 0,
            left: -15,
          }}
        >
          <ArrowNarrowUp size={72} color={leftColor} />
        </Box>
        <Box
          sx={{
            position: 'relative',
            top: -70,
            left: 15,
          }}
        >
          <ArrowNarrowDown size={72} color={rightColor} />
        </Box>
      </Box>
    </Card>
  );
};

function DomesticTransmissionArrows({ direction }: DomesticTransmissionArrowsProps) {
  const { colors } = useMantineTheme();
  const isNorth = direction === 'north';

  if (direction === null) {
    return getArrows(colors.gray[4], colors.gray[4]);
  }

  return getArrows(
    isNorth ? colors.green[6] : colors.gray[4],
    isNorth ? colors.gray[4] : colors.green[6]
  );
}

export default DomesticTransmissionArrows;
