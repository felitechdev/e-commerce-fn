import React, { createContext, useContext, useEffect, useState } from 'react';

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [fromCurrency, setFromCurrency] = useState('RWF');
  const [toCurrency, setToCurrency] = useState('USD');
  const apiKey = '01ea8c1299a54ca2a772e4eb7eacde1d';

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}?apikey=${apiKey}`);
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
      }
    };

    fetchExchangeRates();
  }, [fromCurrency, apiKey]);

  const convertCurrency = (amount, targetCurrency) => {
    if (!exchangeRates || !exchangeRates[targetCurrency]) return amount;

    const rate = exchangeRates[targetCurrency];
    return amount * rate;
  };

  const getCurrencySymbol = (currencyCode) => {
    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      // Add more currency symbols as needed
    };

    return currencySymbols[currencyCode] || currencyCode;
  };

  return (
    <CurrencyContext.Provider value={{ convertCurrency, getCurrencySymbol, fromCurrency, toCurrency, setFromCurrency, setToCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export { CurrencyProvider, useCurrency };
