import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Modal } from './components';

export const API_KEY = process.env.REACT_APP_API_KEY;
export const SERVER = process.env.REACT_APP_SERVER_URL;
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Modal width="60%" height="65%">
      <App />
    </Modal>
  </React.StrictMode>
);
