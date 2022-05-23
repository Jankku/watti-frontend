import { ThemeIcon, useMantineTheme } from '@mantine/core';
import { Bell } from 'tabler-icons-react';

type PushNotificationButtonProps = {
  onClick: () => void;
};

function PushNotificationButton({ onClick }: PushNotificationButtonProps) {
  const { colors } = useMantineTheme();

  return (
    <ThemeIcon variant="filled" size={'lg'} color={colors.orange[5]} onClick={onClick} mr={16}>
      <Bell />
    </ThemeIcon>
  );
}

export default PushNotificationButton;
