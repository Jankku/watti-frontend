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
      <MantineProvider withNormalizeCSS withCSSVariables theme={isDark ? themeDark : themeLight}>
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;
