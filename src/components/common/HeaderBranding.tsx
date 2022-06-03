import { Anchor, Image, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import useBreakpoint from '../../hooks/useBreakpoint';
import lightbulb from './lightbulb.svg';

function HeaderBranding() {
  const { matchesXs } = useBreakpoint();

  return (
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
          color: theme.other.headerTextColor,
          fontSize: matchesXs ? '1.8em' : '2em',
        })}
      >
        Watti
      </Title>
    </Anchor>
  );
}

export default HeaderBranding;
