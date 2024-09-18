import React, { createContext, useContext, useEffect, useState } from "react";
const currencies = ["RWF"]; //, "USD", "EUR", "GBP"
const baseCurrency = "RWF";
const apiKey = "01ea8c1299a54ca2a772e4eb7eacde1d";
const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [currentCurrency, setCurrentCurrency] = useState("RWF");
  const [isLoadingExchangeRates, setIsLoadingExchangeRates] = useState(true);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          `https://open.er-api.com/v6/latest/${baseCurrency}?apikey=${apiKey}`
        );
        const data = await response.json();
        setExchangeRates(data.rates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      } finally {
        setIsLoadingExchangeRates(false);
      }
    };

    fetchExchangeRates();
  }, [apiKey]);

  const convertCurrency = (amount, targetCurrency) => {
    if (!exchangeRates || !exchangeRates[targetCurrency]) return amount;

    const rate = exchangeRates[targetCurrency];
    return amount * rate;
  };

  const handleSetCurrenctCurrency = (curr) => {
    setCurrentCurrency(curr);
  };

  return (
    <CurrencyContext.Provider
      value={{
        convertCurrency,
        handleSetCurrenctCurrency,
        currencies,
        currentCurrency,
        isLoadingExchangeRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};

export { CurrencyProvider, useCurrency };
