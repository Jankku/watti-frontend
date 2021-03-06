import {
  Box,
  CSSObject,
  Group,
  Text,
  ThemeIcon,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import useBreakpoint from '../../hooks/useBreakpoint';

export type NavLinkProps = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

function NavLink({ label, path, icon }: NavLinkProps) {
  const navigate = useNavigate();
  const { matchesSm } = useBreakpoint();
  const { spacing, radius, colors, colorScheme, white } = useMantineTheme();
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: true });
  const isDark = colorScheme === 'dark';

  const baseStyle: CSSObject = {
    display: 'block',
    width: '100%',
    padding: matchesSm ? spacing.md : spacing.xs,
    marginTop: spacing.xs,
    borderRadius: radius.sm,
  };

  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={
        match
          ? {
              ...baseStyle,
              backgroundColor: isDark ? colors.dark[4] : colors.orange[2],
              color: isDark ? colors.dark[0] : colors.dark[7],
            }
          : {
              ...baseStyle,
              '&:hover': {
                backgroundColor: isDark ? colors.dark[4] : colors.orange[2],
                color: isDark ? colors.dark[0] : colors.dark[7],
              },
            }
      }
    >
      <Group>
        <ThemeIcon color={'orange'} variant="filled">
          <Box sx={{ display: 'flex', color: isDark ? colors.dark[9] : white }}>{icon}</Box>
        </ThemeIcon>

        <Text size={`${matchesSm ? 'lg' : 'md'}`} weight={'bold'}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
}

export default NavLink;
