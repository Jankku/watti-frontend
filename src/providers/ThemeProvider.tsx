import { MantineProvider } from '@mantine/core';
import { ColorScheme, ColorSchemeProvider } from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import { ReactNode } from 'react';
import { themeDark, themeLight } from '../theme';

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'watti-color-scheme',
    defaultValue: preferredColorScheme,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  const isDark = colorScheme === 'dark';

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withNormalizeCSS
        withCSSVariables
        theme={isDark ? themeDark : themeLight}
        styles={{
          Header: (theme) => ({
            root: {
              backgroundColor: isDark ? theme.colors.dark[5] : theme.colors.yellow[7],
            },
          }),
          Drawer: (theme) => ({
            drawer: {
              backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
            },
          }),
          Navbar: (theme) => ({
            root: {
              backgroundColor: isDark ? theme.colors.dark[6] : theme.white,
            },
          }),
          Tooltip: (theme) => ({
            body: {
              backgroundColor: theme.colors.dark[7],
              color: theme.white,
            },
            arrow: {
              backgroundColor: theme.colors.dark[7],
            },
          }),
          Button: (theme) => ({
            root: {
              color: theme.other.buttonTextColor,
            },
          }),
        }}
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;
