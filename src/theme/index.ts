import themeLight from './themeLight';
import themeDark from './themeDark';

declare module '@mantine/core' {
  export interface MantineThemeOther {
    textColor: string;
    buttonTextColor: string;
    headerTextColor: string;
    tooltipTextColor: string;
  }
}

export { themeLight, themeDark };
