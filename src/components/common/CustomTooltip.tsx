import { ReactNode } from 'react';
import { Box, Title, Tooltip, TooltipProps, useMantineTheme } from '@mantine/core';
import useBreakpoint from '../../hooks/useBreakpoint';

interface CustomTooltipProps extends TooltipProps {
  title: string;
  description?: string | ReactNode;
}

function CustomTooltip({ children, title, label, ...rest }: CustomTooltipProps) {
  const { spacing } = useMantineTheme();
  const { matchesXs } = useBreakpoint();

  const toolTipContent = (
    <>
      <Title order={5}>{title}</Title>
      <Box
        sx={{
          lineHeight: 1.2,
          paddingBottom: spacing.xs,
        }}
      >
        {label}
      </Box>
    </>
  );

  return (
    <Tooltip
      withArrow
      multiline
      position="bottom-start"
      label={toolTipContent}
      closeDelay={matchesXs ? 2000 : 0}
      {...rest}
    >
      {children}
    </Tooltip>
  );
}

export default CustomTooltip;
