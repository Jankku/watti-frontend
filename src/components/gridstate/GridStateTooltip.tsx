import { ReactNode } from 'react';
import { Box, Text, Title, Tooltip, useMantineTheme } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';

type GridstateTooltipProps = {
  children: ReactNode;
  description: string;
};

function GridstateTooltip({ children, description }: GridstateTooltipProps) {
  const { spacing } = useMantineTheme();
  const { matchesXs } = useBreakpoint();

  const toolTipContent = (
    <Box>
      <Title order={5}>Grid status</Title>
      <Text
        sx={{
          lineHeight: 1.2,
          paddingBottom: spacing.xs,
        }}
      >
        {description}
      </Text>
    </Box>
  );

  return (
    <Tooltip
      wrapLines
      width={200}
      withArrow
      label={toolTipContent}
      closeDelay={matchesXs ? 2000 : 0}
    >
      {children}
    </Tooltip>
  );
}

export default GridstateTooltip;
