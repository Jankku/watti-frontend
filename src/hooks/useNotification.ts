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

  const successNotification = (message: string) =>
    showNotification({
      title: 'Success',
      message,
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colors.green[7],
          color: theme.white,
          '&::before': { backgroundColor: theme.colors.green[9] },
        },
        title: { color: theme.white },
        description: { color: theme.white },
        closeButton: {
          color: theme.white,
          '&:hover': { backgroundColor: theme.colors.green[9] },
        },
      }),
    });
  return { errorNotification, successNotification };
}

export default useNotification;
