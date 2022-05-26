import { Box, Image, Text, Title } from '@mantine/core';
import lightbulb from '../../components/common/lightbulb.svg';
import useBreakpoint from '../../hooks/useBreakpoint';

function Branding() {
  const { matchesSm } = useBreakpoint();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: matchesSm ? 'column' : 'row',
        padding: '3em 0em',
      }}
    >
      <Image
        src={lightbulb}
        width={matchesSm ? '8em' : undefined}
        sx={{ transform: 'rotate(-30deg)' }}
      />
      <Box>
        <Title order={1} align={'center'} sx={{ fontSize: '5em', textTransform: 'uppercase' }}>
          Watti
        </Title>
        <Text weight={500} align={'center'} size={'lg'} sx={{ fontFamily: 'montserrat' }}>
          Finnish electricity dashboard
        </Text>
      </Box>
    </Box>
  );
}

export default Branding;
