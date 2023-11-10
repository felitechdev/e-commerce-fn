// DisplayCurrency.js
import React from 'react';
import { useCurrency } from '../CurrencyProvider/CurrencyProvider';

const DisplayCurrency = ({ amount, currencyCode }) => {
  const { getCurrencySymbol,convertCurrency } = useCurrency();
  const convertedAmount = convertCurrency(amount, currencyCode);

  return (
    <div className='space-x-2'>
      <span>{currencyCode}</span>
      <span>{convertedAmount.toFixed(2)}</span>
    </div>
  );
};

export default DisplayCurrency;
