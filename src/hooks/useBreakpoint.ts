import { useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

function useBreakpoint() {
  const { breakpoints } = useMantineTheme();
  const matchesXs = useMediaQuery(`(max-width: ${breakpoints.xs}px)`);
  const matchesSm = useMediaQuery(`(max-width: ${breakpoints.sm}px)`);
  const matchesMd = useMediaQuery(`(max-width: ${breakpoints.md}px)`);
  const matchesLg = useMediaQuery(`(max-width: ${breakpoints.lg}px)`);
  const matchesXl = useMediaQuery(`(max-width: ${breakpoints.xl}px)`);

  return { matchesXs, matchesSm, matchesMd, matchesLg, matchesXl };
}

export default useBreakpoint;
