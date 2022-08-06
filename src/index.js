import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Modal } from './components';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Modal width="60%" height="65%"><App /></Modal>
  </React.StrictMode>
);
