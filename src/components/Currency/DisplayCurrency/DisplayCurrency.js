// // DisplayCurrency.js
// import React from "react";
// import { useCurrency } from "../CurrencyProvider/CurrencyProvider";
// import discountedFinalPrice from "../../../util/discountedFinalPrice";

// const DisplayCurrency = ({ product }) => {
//   const { currentCurrency, convertCurrency } = useCurrency();

//   // Calculate discount
//   const discountedPrice =
//     product?.discountPercentage > 0
//       ? discountedFinalPrice(product.price, product?.discountPercentage)
//       : product?.price;

//   // Derive final price based on current currency
//   const finalDisplayPrice =
//     product.currency !== currentCurrency
//       ? convertCurrency(discountedPrice, currentCurrency)
//       : discountedPrice;
//   console.log(
//     "product?.discountPercentage",
//     finalDisplayPrice,
//     discountedPrice
//   );

//   return (
//     <div className="space-x-2">
//       <span>
//         {new Intl.NumberFormat(undefined, {
//           style: "currency",
//           currency: currentCurrency,
//         }).format(finalDisplayPrice)}
//       </span>
//     </div>
//   );
// };

import React from "react";
import { useCurrency } from "../CurrencyProvider/CurrencyProvider";
import discountedFinalPrice from "../../../util/discountedFinalPrice";

const DisplayCurrency = ({ product, isDiscount }) => {
  const { currentCurrency, convertCurrency } = useCurrency();

  // Calculate discount
  const discountedPrice =
    product?.discountPercentage > 0
      ? discountedFinalPrice(product.price, product?.discountPercentage)
      : product?.price;

  // Ensure discountedPrice is a number
  const discountedPriceValue = parseFloat(discountedPrice);

  // Derive final price based on current currency
  const finalDisplayPrice =
    product.currency !== currentCurrency
      ? convertCurrency(discountedPriceValue, currentCurrency)
      : discountedPriceValue;

  console.log(
    "Product Price:",
    product.price,
    "Discount Percentage:",
    product?.discountPercentage,
    "Discounted Price:",
    discountedPriceValue,
    "Final Display Price:",
    finalDisplayPrice,
    "Current Currency:",
    currentCurrency
  );

  return (
    <div className="space-x-2">
      {isDiscount ? (
        <span>
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currentCurrency,
          }).format(finalDisplayPrice)}
        </span>
      ) : (
        <span>
          {new Intl.NumberFormat(undefined, {
            style: "currency",
            currency: currentCurrency,
          }).format(product.price)}
        </span>
      )}
    </div>
  );
};

export default DisplayCurrency;
