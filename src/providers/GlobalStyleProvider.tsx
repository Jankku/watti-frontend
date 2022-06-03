import { Global } from '@mantine/core';

function GlobalStyleProvider() {
  return (
    <Global
      styles={(theme) => ({
        body: {
          ...theme.fn.fontStyles(),
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
          lineHeight: theme.lineHeight,
          WebkitFontSmoothing: theme.colorScheme === 'dark' ? 'antialiased' : 'auto',
          MozOsxFontSmoothing: 'grayscale',

          '*::selection': {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.orange[4] : theme.colors.orange[6],
            color: theme.colorScheme === 'dark' ? theme.black : theme.white,
          },
        },
      })}
    />
  );
}

export default GlobalStyleProvider;
