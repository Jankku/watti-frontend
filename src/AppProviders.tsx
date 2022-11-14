import { ReactNode } from 'react';
import { NotificationsProvider } from '@mantine/notifications';
import GlobalStyleProvider from './providers/GlobalStyleProvider';
import ThemeProvider from './providers/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 2,
    },
  },
});

type AppProvidersProps = {
  children: ReactNode;
};

function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <GlobalStyleProvider />
      <NotificationsProvider position="top-right" autoClose={2000} limit={3}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          {children}
        </QueryClientProvider>
      </NotificationsProvider>
    </ThemeProvider>
  );
}

export default AppProviders;
