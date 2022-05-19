import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Navbar from '../navigation/Navbar';

function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <AppShell
      header={<Header drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
      navbar={<Navbar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />}
    >
      <Outlet />
    </AppShell>
  );
}

export default Layout;
