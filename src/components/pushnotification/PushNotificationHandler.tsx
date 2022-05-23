import { useState } from 'react';
import { useEffect } from 'react';
import useNotification from '../../hooks/useNotification';
import usePushNotification from '../../hooks/usePushNotification';
import PushNotificationButton from './PushNotificationButton';

function PushNotificationHandler() {
  const [handled, setHandled] = useState(false);
  const { permission, askUserPermission, initPushNotifications } = usePushNotification();
  const { errorNotification } = useNotification();

  const setup = async () => {
    if (permission === 'granted') {
      await initPushNotifications();
    } else if (permission === 'default') {
      await askUserPermission();
    } else {
      errorNotification('Notification permission denied.');
    }
  };

  useEffect(() => {
    if (handled) {
      setup();
    }
  }, [permission, handled]);

  return (
    <>
      <PushNotificationButton
        onClick={() => {
          setHandled(true);
          setup();
        }}
      />
    </>
  );
}

export default PushNotificationHandler;
