import React from 'react';
import ReactDOM from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';
import 'slick-carousel/slick/slick.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import './index.css';
// import "./App.css";
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { CurrencyProvider } from './components/Currency/CurrencyProvider/CurrencyProvider';
import UserProvider from './context/UserContex';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <CurrencyProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </CurrencyProvider>
      </QueryClientProvider>
    </Provider>
  </UserProvider>
);
