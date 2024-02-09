import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import 'slick-carousel/slick/slick.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CurrencyProvider } from './components/Currency/CurrencyProvider/CurrencyProvider';
import UserProvider from './context/UserContex';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <Provider store={store}>
      <CurrencyProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CurrencyProvider>
    </Provider>
  </UserProvider>
);
