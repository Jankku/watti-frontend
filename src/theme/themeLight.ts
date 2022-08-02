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
  components: {
    Header: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.yellow[7],
        },
      }),
    },
    Drawer: {
      styles: (theme) => ({
        drawer: {
          backgroundColor: theme.white,
        },
      }),
    },
    Navbar: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.white,
        },
      }),
    },
    Tooltip: {
      styles: (theme) => ({
        body: {
          backgroundColor: theme.colors.dark[7],
          color: theme.white,
        },
        arrow: {
          backgroundColor: theme.colors.dark[7],
        },
      }),
    },
    Button: {
      styles: (theme) => ({
        root: {
          color: theme.other.buttonTextColor,
        },
      }),
    },
    DateRangePicker: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: theme.white,
        },
      }),
    },
  },
};

export default themeLight;
