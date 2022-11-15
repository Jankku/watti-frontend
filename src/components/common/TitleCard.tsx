import { Box, Card, Text, Title, useMantineTheme } from '@mantine/core';
import { ReactNode } from 'react';

type TitleCardProps = {
  title: string;
  description?: string;
  bgColor?: string;
  children: ReactNode;
};

function TitleCard({ title, description, bgColor, children }: TitleCardProps) {
  const { colors, colorScheme, other } = useMantineTheme();

  const getCardColor = () => {
    if (bgColor) return bgColor;
    return colorScheme === 'dark' ? colors.dark[5] : colors.gray[0];
  };

  return (
    <Card
      withBorder
      radius={'sm'}
      p={'md'}
      sx={{
        backgroundColor: getCardColor(),
        color: other.textColor,
      }}
    >
      <Box>
        <Title order={4}>{title}</Title>
        {description ? <Text mb={'md'}>{description}</Text> : null}
        {children}
      </Box>
    </Card>
  );
}

export default TitleCard;
