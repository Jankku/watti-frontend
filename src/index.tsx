import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <MantineProvider>
      <NotificationsProvider position="top-right" autoClose={3000} limit={3}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  </React.StrictMode>
);
