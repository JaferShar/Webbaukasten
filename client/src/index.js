import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)