/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

const ignored = self.__WB_MANIFEST;

self.addEventListener('install', (_) => {
  self.skipWaiting();
});

self.addEventListener('push', (event) => {
  const data = event.data.json();

  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.text,
      icon: '/logo192.png',
    })
  );
});
