import { Text, useMantineTheme } from '@mantine/core';
import TitleCard from '../common/TitleCard';

type StatsCardProps = {
  title: string;
  value: number | string;
  unit: string;
};

function StatsCard({ title, value, unit }: StatsCardProps) {
  const { colors, colorScheme } = useMantineTheme();
  return (
    <TitleCard title={title} bgColor={colorScheme === 'dark' ? undefined : colors.orange[0]}>
      <Text weight={500}>
        {value ?? '-'} {unit}
      </Text>
    </TitleCard>
  );
}

export default StatsCard;
