import { ReactNode } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import GlobalStyleProvider from './providers/GlobalStyleProvider';
import ThemeProvider from './providers/ThemeProvider';

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <GlobalStyleProvider />
      <NotificationsProvider position="top-right" autoClose={2000} limit={3}>
        {children}
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
