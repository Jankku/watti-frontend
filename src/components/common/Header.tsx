import { Anchor, Burger, Header as MantineHeader, Image, MediaQuery, Title } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import lightbulb from './lightbulb.svg';

type HeaderProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

function Header({ drawerOpen, setDrawerOpen }: HeaderProps) {
  return (
    <MantineHeader
      height={60}
      p="md"
      sx={(theme) => ({
        backgroundColor: theme.colors.yellow[7],
        display: 'flex',
        alignItems: 'center',
      })}
    >
      <MediaQuery largerThan={'md'} styles={{ display: 'none' }}>
        <Burger
          opened={drawerOpen}
          onClick={() => setDrawerOpen((prev: boolean) => !prev)}
          mr={'sm'}
        />
      </MediaQuery>

      <Anchor
        component={Link}
        to={'/'}
        underline={false}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Image src={lightbulb} width={32} height={32} sx={{ transform: 'rotate(-30deg)' }} />
        <Title
          order={1}
          sx={(theme) => ({
            textTransform: 'uppercase',
            color: theme.black,
            fontSize: '2em',
          })}
        >
          Watti
        </Title>
      </Anchor>
    </MantineHeader>
  );
}

export default Header;
