import React from "react";

import ProductsGridContainer from "../../../components/home/Products/ProductsGridContainer.js";
import ProductPreview from "../../../components/home/Products/Product.js";

export default function ShopProducts({
  products,
  category,
  subcategory,
  productClass,
  hidetop,
}) {
  return (
    <div className="p-2">
      {!hidetop && (
        <>
          <h2 className="m-2 font-semibold capitalize leading-tight text-[#1D6F2B]">
            {productClass?.name || ""} {`: ${category?.name || ""}`}{" "}
            {subcategory?.name ? `: ${subcategory.name}` : ""}
          </h2>
          <hr class="mb-8 mt-6 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
        </>
      )}

      <div>
        <ProductsGridContainer>
          {products &&
            products?.map((product, index) => (
              <ProductPreview key={product.id + index} productInfo={product} />
            ))}
        </ProductsGridContainer>
      </div>
    </div>
  );
}
