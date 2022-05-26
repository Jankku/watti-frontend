import { Box, Card, Title, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

type TitleCardProps = {
  title: string;
  children: ReactNode;
};

function TitleCard({ title, children }: TitleCardProps) {
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
      <Box>
        <Title order={4}>{title}</Title>
        <Card.Section>{children}</Card.Section>
      </Box>
    </Card>
  );
}

export default TitleCard;
