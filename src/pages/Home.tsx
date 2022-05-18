import { Box, Card, Container, Image, Text, Title, useMantineTheme } from '@mantine/core';
import lightbulb from '../components/common/lightbulb.svg';
import useBreakpoint from '../hooks/useBreakpoint';

function Home() {
  const { colors } = useMantineTheme();
  const { matchesSm } = useBreakpoint();

  return (
    <Container size={'sm'} pt={'lg'}>
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
      <Card
        sx={{
          backgroundColor: colors.orange[4],
          lineHeight: 1.0,
        }}
      >
        <Text>Track electricity production and consumption. Data is provided by Fingrid.</Text>
      </Card>
    </Container>
  );
}

export default Home;
