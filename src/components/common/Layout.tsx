import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import useBreakpoint from '../../hooks/useBreakpoint';
import Header from './Header';
import Navbar from '../navigation/Navbar';

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { matchesMd } = useBreakpoint();

  return (
    <AppShell
      fixed={!matchesMd}
      header={<Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
      navbar={<Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
    >
      <Outlet />
    </AppShell>
  );
}

export default Layout;
