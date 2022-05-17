import { Anchor, Box, Text } from '@mantine/core';

function Footer() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 2,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingBottom: '0.5em',
      }}
    >
      <Text color={'dimmed'} weight={500}>
        Made by{' '}
        <Anchor href="https://github.com/Jankku/" target={'_blank'}>
          Jankku ✨
        </Anchor>
      </Text>
    </Box>
  );
}

export default Footer;
