import { Box, Drawer, MediaQuery, Navbar as MantineNavbar } from '@mantine/core';
import NavLink, { NavLinkProps } from './NavLink';
import { Home, Plug } from 'tabler-icons-react';
import { Dispatch, SetStateAction } from 'react';
import Footer from './Footer';

export const navLinks: NavLinkProps[] = [
  {
    label: 'Home',
    path: '/',
    icon: <Home size={16} />,
  },
  {
    label: 'Consumption',
    path: '/consumption',
    icon: <Plug size={16} />,
  },
];

type NavbarProps = {
  drawerOpen: boolean;
  setDrawerOpen: Dispatch<SetStateAction<boolean>>;
};

function Navbar({ drawerOpen, setDrawerOpen }: NavbarProps) {
  const navItems = navLinks.map((link) => <NavLink {...link} key={link.label} />);

  return (
    <>
      <Drawer
        padding="xs"
        opened={drawerOpen}
        onClose={() => setDrawerOpen((prev) => !prev)}
        styles={{
          drawer: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          },
        }}
      >
        <MantineNavbar.Section>{navItems}</MantineNavbar.Section>
        <Footer />
      </Drawer>

      {/* Desktop navigation */}
      <MediaQuery smallerThan={'md'} styles={{ display: 'none' }}>
        <MantineNavbar width={{ base: 250 }} p="xs">
          <MantineNavbar.Section grow>{navItems}</MantineNavbar.Section>

          <MantineNavbar.Section sx={{ display: 'flex', justifyContent: 'center' }}>
            <Footer />
          </MantineNavbar.Section>
        </MantineNavbar>
      </MediaQuery>
    </>
  );
}

export default Navbar;