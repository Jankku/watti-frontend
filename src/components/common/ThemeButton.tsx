import { ActionIcon, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { MoonStars, Sun } from 'tabler-icons-react';

function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { colors } = useMantineTheme();
  const isDark = colorScheme === 'dark';

  return (
    <ActionIcon
      variant={isDark ? 'filled' : 'outline'}
      size={'md'}
      onClick={() => toggleColorScheme()}
      title="Toggle theme"
      color={'orange'}
      sx={{
        color: colors.gray[9],
        borderColor: isDark ? colors.orange[6] : colors.dark[3],
      }}
    >
      {isDark ? <Sun size={20} /> : <MoonStars size={20} />}
    </ActionIcon>
  );
}

export default ThemeButton;
