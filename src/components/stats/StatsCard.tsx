import { Card, Text, Title, useMantineTheme } from '@mantine/core';

type StatsCardProps = {
  title: string;
  value: number | string;
  unit: string;
};

function StatsCard({ title, value, unit }: StatsCardProps) {
  const { colors, black } = useMantineTheme();
  return (
    <Card
      withBorder
      radius={'sm'}
      sx={{
        backgroundColor: colors.orange[1],
        color: black,
      }}
    >
      <Card.Section p={'md'}>
        <Title order={4}>{title}</Title>
        <Text weight={500}>
          {value ?? '-'} {unit}
        </Text>
      </Card.Section>
    </Card>
  );
}

export default StatsCard;
