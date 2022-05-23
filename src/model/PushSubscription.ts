type PushSubscription = {
  endpoint: string;
  keys: { auth: string; p256dh: string };
  created: Date;
};

export default PushSubscription;
