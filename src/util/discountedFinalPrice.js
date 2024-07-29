// function discountedFinalPrice(price, discountRate) {
//   // Ensure inputs are valid numbers
//   price = parseFloat(price);
//   discountRate = parseFloat(discountRate);

//   // Check for invalid inputs
//   if (isNaN(price) || isNaN(discountRate)) {
//     return 'Invalid Input: Please enter valid numbers for price and discount rate.';
//   }

//   // Ensure discount rate is between 0 and 100
//   if (discountRate < 0 || discountRate > 100) {
//     return 'Invalid Input: Discount rate must be between 0 and 100.';
//   }

//   // Calculate the discount amount
//   const discountAmount = (price * discountRate) / 100;

//   // Calculate the final price
//   const finalPrice = price - discountAmount;

//   // Return the final price with two decimal places
//   return finalPrice.toFixed(2);
// }

function discountedFinalPrice(price, discountRate) {
  // Ensure inputs are valid numbers
  price = parseFloat(price);
  discountRate = parseFloat(discountRate);

  // Check for invalid inputs
  if (isNaN(price) || isNaN(discountRate)) {
    console.error(
      "Invalid Input: Please enter valid numbers for price and discount rate."
    );
    return price; // Returning the original price if inputs are invalid
  }

  // Ensure discount rate is between 0 and 100
  if (discountRate < 0 || discountRate > 100) {
    console.error("Invalid Input: Discount rate must be between 0 and 100.");
    return price; // Returning the original price if discount rate is invalid
  }

  // Calculate the discount amount
  const discountAmount = (price * discountRate) / 100;

  // Calculate the final price
  const finalPrice = price - discountAmount;

  // Return the final price as a number

  return parseFloat(finalPrice.toFixed(2));
}

export default discountedFinalPrice;
