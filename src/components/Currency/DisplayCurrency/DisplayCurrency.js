// DisplayCurrency.js
import React from 'react';
import { useCurrency } from '../CurrencyProvider/CurrencyProvider';
import discountedFinalPrice from '../../../util/discountedFinalPrice';

const DisplayCurrency = ({ product }) => {
  const { currentCurrency, convertCurrency } = useCurrency();

  // Calculate discount
  const discountedPrice =
    product?.discountPercentage > 0
      ? discountedFinalPrice(product.price, product?.discountPercentage)
      : product?.price;

  // Derive final price based on current currency
  const finalDisplayPrice =
    product.currency !== currentCurrency
      ? convertCurrency(discountedPrice, currentCurrency)
      : discountedPrice;

  return (
    <div className='space-x-2'>
      <span>
        {new Intl.NumberFormat(undefined, {
          style: 'currency',
          currency: currentCurrency,
        }).format(finalDisplayPrice)}
      </span>
    </div>
  );
};

export default DisplayCurrency;
