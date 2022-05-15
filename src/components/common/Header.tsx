import { Anchor, Box, Header as MantineHeader, Image, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import lightbulb from './lightbulb.svg';

function Header() {
  const navigate = useNavigate();

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
      <Anchor
        component={Link}
        to={'/'}
        underline={false}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Image src={lightbulb} width={32} height={32} />
        <Title
          order={2}
          sx={(theme) => ({
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
