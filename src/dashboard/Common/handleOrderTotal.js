import React from "react";
// -calcurate order fo each product
export const handlecountorders = (orders, productId) => {
  const itemId = productId; //- Item to calculate the total quantity
  let totalQuantity = 0;

  const ordered = orders?.map((order) => {
    order.items.forEach((item) => {
      // console.log("item", item.itemDetails?.id, item.quantity, item);
      if (item.product === itemId) {
        totalQuantity += item.quantity;
      }
    });

    return {
      ...order,
      totalQuantity: totalQuantity,
    };
  });
  console.log("ordered", ordered);
  console.log("Total quantity for item", itemId, ":", totalQuantity);
  return totalQuantity;
};
