import { Box, Burger, Header as MantineHeader, MediaQuery, Space } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import GridState from '../gridstate/GridState';
import HeaderBranding from './HeaderBranding';
import ThemeButton from './ThemeButton';

type HeaderProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ drawerOpen, setDrawerOpen }: HeaderProps) {
  return (
    <MantineHeader
      height={60}
      p="md"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
        <Burger opened={drawerOpen} onClick={() => setDrawerOpen((prev) => !prev)} mr={'sm'} />
      </MediaQuery>

      <HeaderBranding />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexFlow: 'row nowrap',
        }}
      >
        <GridState />
        <Space w={'lg'} />
        <ThemeButton />
      </Box>
    </MantineHeader>
  );
}

export default Header;
