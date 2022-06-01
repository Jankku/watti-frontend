import { ReactNode } from 'react';
import { Box, Text, Title, Tooltip, TooltipProps, useMantineTheme } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';

interface GridstateTooltipProps extends TooltipProps {
  title: string;
  description?: string | ReactNode;
}

function CustomTooltip({ children, title, label, ...rest }: GridstateTooltipProps) {
  const { spacing } = useMantineTheme();
  const { matchesXs } = useBreakpoint();

  const toolTipContent = (
    <Box>
      <Title order={5}>{title}</Title>
      <Text
        sx={{
          lineHeight: 1.2,
          paddingBottom: spacing.xs,
        }}
      >
        {label}
      </Text>
    </Box>
  );

  return (
    <Tooltip withArrow wrapLines label={toolTipContent} closeDelay={matchesXs ? 2000 : 0} {...rest}>
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
