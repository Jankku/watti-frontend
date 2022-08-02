import { Anchor, Box, Button, Container, SimpleGrid, Text, useMantineTheme } from '@mantine/core';
import TitleCard from '../components/common/TitleCard';
import Branding from '../components/home/Branding';
import useBreakpoint from '../hooks/useBreakpoint';

function Home() {
  const { colors, colorScheme, spacing } = useMantineTheme();
  const { matchesXs } = useBreakpoint();

  return (
    <Container size={'sm'}>
      <Branding />

      <SimpleGrid cols={matchesXs ? 1 : 2} spacing={matchesXs ? spacing.xl : spacing.md}>
        <TitleCard title="About" bgColor={colorScheme === 'dark' ? undefined : colors.orange[1]}>
          <Text size="md" pt={spacing.xs}>
            Track electricity production and consumption. Data is provided by Fingrid.
          </Text>
        </TitleCard>

        <TitleCard
          title="Source code"
          bgColor={colorScheme === 'dark' ? undefined : colors.orange[1]}
        >
          <Box
            pt={spacing.xs}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              rowGap: spacing.sm,
            }}
          >
            <Anchor mt={4} href="https://github.com/Jankku/watti-backend" target="_blank">
              <Button fullWidth size="md">
                Backend
              </Button>
            </Anchor>
            <Anchor mt={4} href="https://github.com/Jankku/watti-frontend" target="_blank">
              <Button fullWidth size="md">
                Frontend
              </Button>
            </Anchor>
          </Box>
        </TitleCard>
      </SimpleGrid>
    </Container>
  );
}

export default Home;
