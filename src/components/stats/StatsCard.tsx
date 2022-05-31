import { Text, useMantineTheme } from '@mantine/core';
import TitleCard from '../common/TitleCard';

type StatsCardProps = {
  title: string;
  value: number | string;
  unit: string;
};

function StatsCard({ title, value, unit }: StatsCardProps) {
  const { colors } = useMantineTheme();
  return (
    <TitleCard title={title} bgColor={colors.orange[1]}>
      <Text weight={500}>
        {value ?? '-'} {unit}
      </Text>
    </TitleCard>
  );
}

export default StatsCard;
