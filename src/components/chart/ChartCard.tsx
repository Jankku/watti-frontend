import { Card, Title, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

type ChartCardProps = {
  title: string;
  children: ReactNode;
};

function ChartCard({ title, children }: ChartCardProps) {
  const { colors } = useMantineTheme();
  return (
    <>
      <Card withBorder py="xl" my="xl" sx={{ backgroundColor: colors.gray[0] }}>
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
