import { ThemeIcon, useMantineTheme } from '@mantine/core';
import { Bell, BellRinging } from 'tabler-icons-react';

type PushNotificationButtonProps = {
  active: boolean;
  onClick: () => void;
};

function PushNotificationButton({ active, onClick }: PushNotificationButtonProps) {
  const { colors } = useMantineTheme();

  return (
    <ThemeIcon
      variant={active ? 'filled' : 'outline'}
      size={'lg'}
      color={colors.orange[5]}
      onClick={onClick}
      mr={16}
    >
      {active ? <BellRinging /> : <Bell />}
    </ThemeIcon>
  );
}

export default PushNotificationButton;
