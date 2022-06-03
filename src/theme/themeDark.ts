import { MantineThemeOverride } from '@mantine/core';

const themeDark: MantineThemeOverride = {
  colorScheme: 'dark',
  primaryColor: 'orange',
  primaryShade: 4,
  defaultRadius: 4,
  headings: {
    fontFamily: 'montserrat, sans-serif',
  },
  other: {
    textColor: '#FFF',
    buttonTextColor: '#000',
    headerTextColor: '#FFF',
    tooltipTextColor: '#FFF',
  },
};

export default themeDark;
