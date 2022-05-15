import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <AppShell header={<Header />}>
      <Outlet />
    </AppShell>
  );
}

export default Layout;
