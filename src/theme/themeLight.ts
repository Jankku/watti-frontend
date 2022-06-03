import { MantineThemeOverride } from '@mantine/core';

const themeLight: MantineThemeOverride = {
  colorScheme: 'light',
  primaryColor: 'orange',
  defaultRadius: 4,
  headings: {
    fontFamily: 'montserrat, sans-serif',
  },
  other: {
    textColor: '#000',
    buttonTextColor: '#FFF',
    headerTextColor: '#000',
    tooltipTextColor: '#FFF',
  },
};

export default themeLight;
