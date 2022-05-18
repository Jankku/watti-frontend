import { Group, Text, ThemeIcon, UnstyledButton, useMantineTheme } from '@mantine/core';
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
  const { spacing, radius, colors, black } = useMantineTheme();
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: true });

  const baseStyle = {
    display: 'block',
    width: '100%',
    padding: matchesSm ? spacing.md : spacing.xs,
    marginTop: spacing.xs,
    borderRadius: radius.sm,
    color: black,
  };

  return (
    <UnstyledButton
      onClick={() => navigate(path)}
      sx={
        match
          ? {
              ...baseStyle,
              backgroundColor: colors.orange[1],
            }
          : {
              ...baseStyle,
              '&:hover': {
                backgroundColor: colors.orange[0],
              },
            }
      }
    >
      <Group>
        <ThemeIcon color={'orange'} variant="filled">
          {icon}
        </ThemeIcon>

        <Text size={`${matchesSm ? 'lg' : 'md'}`} weight={'bold'}>
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
}

export default NavLink;
