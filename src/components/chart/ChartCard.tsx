import { Card, Title, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  children: ReactNode;
};

function ChartCard({ title, children }: ChartCardProps) {
  const { colors, colorScheme, other } = useMantineTheme();
  return (
    <>
      <Card
        withBorder
        py="xl"
        my="xl"
        sx={{
          backgroundColor: colorScheme === 'dark' ? colors.dark[4] : colors.gray[0],
          color: other.textColor,
        }}
      >
        <Card.Section>
          <Title order={4} align="center" pt="sm" pb="md">
            {title}
          </Title>
        </Card.Section>
        {children}
      </Card>
    </>
  );
}

export default ChartCard;
