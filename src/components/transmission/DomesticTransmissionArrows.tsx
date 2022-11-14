import { Box, Card, useMantineTheme } from '@mantine/core';
import { ArrowNarrowDown, ArrowNarrowUp } from 'tabler-icons-react';

export type DomesticTransmissionDirection = 'north' | 'south' | null;

type DomesticTransmissionArrowsProps = {
  direction: DomesticTransmissionDirection;
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

  const topArrow = isNorth ? colors.green[6] : colors.gray[4];
  const bottomArrow = isNorth ? colors.gray[4] : colors.green[6];

  return getArrows(topArrow, bottomArrow);
}

export default DomesticTransmissionArrows;
