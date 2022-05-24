import { useState } from 'react';
import { useEffect } from 'react';
import useNotification from '../../hooks/useNotification';
import usePushNotification from '../../hooks/usePushNotification';
import PushNotificationButton from './PushNotificationButton';

function PushNotificationHandler() {
  const [handled, setHandled] = useState(false);
  const [notificationActive, setNotificationActive] = useState(false);
  const { errorNotification, successNotification } = useNotification();
  const {
    permission,
    isSupported,
    askUserPermission,
    initPushNotifications,
    removePushSubscription,
  } = usePushNotification();

  const setupSubscription = async () => {
    if (permission === 'granted') {
      const result = await initPushNotifications();

      if (result) {
        successNotification('Notifications enabled.');
        setNotificationActive(true);
      } else {
        errorNotification('Failed to enable notifications.');
      }
    } else if (permission === 'default') {
      await askUserPermission();
    } else {
      errorNotification('Notification permission denied.');
    }
  };

  const removeSubscription = async () => {
    const result = await removePushSubscription();

    if (result) {
      successNotification('Notifications disabled.');
      setNotificationActive(false);
    } else {
      errorNotification('Failed to disable notifications.');
    }
  };

  useEffect(() => {
    if (handled) {
      setupSubscription();
    }
  }, [permission, handled]);

  return isSupported() ? (
    <>
      <PushNotificationButton
        active={notificationActive}
        onClick={() => {
          setHandled(true);
          if (notificationActive) {
            removeSubscription();
          } else {
            setupSubscription();
          }
        }}
      />
    </>
  ) : null;
}

export default PushNotificationHandler;
