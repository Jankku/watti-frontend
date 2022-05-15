import { showNotification } from '@mantine/notifications';

function useNotification() {
  const errorNotification = (message: string) =>
    showNotification({
      title: 'Error',
      message,
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.red[7],
          color: theme.white,
          '&::before': { backgroundColor: theme.colors.red[9] },
        },
        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          '&:hover': { backgroundColor: theme.colors.red[9] },
        },
      }),
    });
  return { errorNotification };
}

export default useNotification;
