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
    textColor: '#eee',
    buttonTextColor: '#000',
    headerTextColor: '#fff',
    tooltipTextColor: '#fff',
  },
  components: {
    Header: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.dark[5],
        },
      }),
    },
    Drawer: {
      styles: (theme) => ({
        drawer: {
          backgroundColor: theme.colors.dark[6],
        },
      }),
    },
    Navbar: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.dark[6],
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
          backgroundColor: theme.colors.dark[5],
        },
      }),
    },
  },
};

export default themeDark;
