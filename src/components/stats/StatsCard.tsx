import { Text } from '@mantine/core';
import TitleCard from '../common/TitleCard';

type StatsCardProps = {
  title: string;
  value: number | string;
  unit: string;
};

function StatsCard({ title, value, unit }: StatsCardProps) {
  return (
    <TitleCard title={title}>
      <Text weight={500}>
        {value ?? '-'} {unit}
      </Text>
    </TitleCard>
  );
}

export default StatsCard;
