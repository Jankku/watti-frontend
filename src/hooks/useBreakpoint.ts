import { useMediaQuery } from '@mantine/hooks';

function useBreakPoint() {
  const matchesXs = useMediaQuery('(max-width: 576px)');
  const matchesSm = useMediaQuery('(max-width: 768px)');
  const matchesMd = useMediaQuery('(max-width: 992px)');
  const matchesLg = useMediaQuery('(max-width: 1200px)');
  const matchesXl = useMediaQuery('(max-width: 1400px)');
  return { matchesXs, matchesSm, matchesMd, matchesLg, matchesXl };
}

export default useBreakPoint;
