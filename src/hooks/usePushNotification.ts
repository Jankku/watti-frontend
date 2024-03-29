import { useState } from 'react';
import axios from '../axios';

type PublicKeyResponse = {
  vapidPublicKey: string;
};

function usePushNotification() {
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null);

  const isSupported = () => 'serviceWorker' in navigator && 'PushManager' in window;

  const askUserPermission = async (): Promise<NotificationPermission> => {
    const permission = await Notification.requestPermission();
    setPermission(permission);
    return permission;
  };

  const registerWorker = async () =>
    await navigator.serviceWorker.register('../../service-worker.js');

  const getPublicKey = async () => {
    const { data } = await axios.get<PublicKeyResponse>('/api/subscription/key');
    return data.vapidPublicKey;
  };

  const getPushSubscription = async () => {
    const registration = await navigator.serviceWorker.ready;
    let subscription: PushSubscription | null = await registration.pushManager.getSubscription();
    console.log(JSON.stringify(subscription));

    if (!subscription) {
      subscription = await createPushSubscription();
    }

    return subscription;
  };

  const createPushSubscription = async (): Promise<PushSubscription | null> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: await getPublicKey(),
      });

      const { status } = await axios.post('/api/subscription/create', {
        data: { subscription: newSubscription },
      });

      if ([200, 201].includes(status)) {
        return newSubscription;
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  };

  const removePushSubscription = async (): Promise<boolean> => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      const result = await subscription?.unsubscribe();

      if (!result) return false;

      const { status } = await axios.post('/api/subscription/remove', {
        data: { subscription: subscription },
      });

      if (status === 200) return true;
    } catch (error) {
      console.log(error);
    }

    return false;
  };

  const initPushNotifications = async (): Promise<boolean> => {
    if (!isSupported()) {
      console.error('Push notifications not supported');
      return false;
    }

    if (permission !== 'granted') {
      console.error('Notification permission denied.');
      return false;
    }

    await registerWorker();
    const sub = await getPushSubscription();
    setPushSubscription(sub);
    return sub !== null;
  };

  return {
    permission,
    isSupported,
    askUserPermission,
    initPushNotifications,
    removePushSubscription,
  };
}

export default usePushNotification;
