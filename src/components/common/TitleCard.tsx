import { Box, Card, Text, Title, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

type TitleCardProps = {
  title: string;
  description?: string;
  bgColor?: string;
  children: ReactNode;
};

function TitleCard({ title, description, bgColor, children }: TitleCardProps) {
  const { colors, black } = useMantineTheme();
  return (
    <Card
      withBorder
      radius={'sm'}
      sx={{
        backgroundColor: bgColor ?? colors.gray[0],
        color: black,
      }}
    >
      <Box>
        <Title order={4}>{title}</Title>
        {description ? <Text mb={'md'}>{description}</Text> : null}
        <Card.Section>{children}</Card.Section>
      </Box>
    </Card>
  );
}

export default TitleCard;
