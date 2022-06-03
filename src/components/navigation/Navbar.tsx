import { Drawer, MediaQuery, Navbar as MantineNavbar } from '@mantine/core';
import NavLink, { NavLinkProps } from './NavLink';
import { ArrowBigUpLines, ArrowsDownUp, Home, Plug } from 'tabler-icons-react';
import { Dispatch, SetStateAction } from 'react';
import Footer from '../common/Footer';

const navIconSize = 16;

export const navLinks: NavLinkProps[] = [
  {
    label: 'Home',
    path: '/',
    icon: <Home size={navIconSize} />,
  },
  {
    label: 'Production',
    path: '/production',
    icon: <ArrowBigUpLines size={navIconSize} />,
  },
  {
    label: 'Consumption',
    path: '/consumption',
    icon: <Plug size={navIconSize} />,
  },
  {
    label: 'Transmission',
    path: '/transmission',
    icon: <ArrowsDownUp size={navIconSize} />,
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
          <Footer />
        </MantineNavbar>
      </MediaQuery>
    </>
  );
}

export default Navbar;
