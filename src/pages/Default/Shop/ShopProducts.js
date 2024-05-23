import React from "react";

import ProductsGridContainer from "../../../components/home/Products/ProductsGridContainer.js";
import ProductPreview from "../../../components/home/Products/Product.js";

export default function ShopProducts({
  products,
  category,
  subcategory,
  productClass,
}) {
  return (
    <div>
      <h2 className="capitalize mt-0 text-4xl font-medium leading-tight text-[#1D6F2B]">
        {productClass?.name} {category?.name}{" "}
        {subcategory?.name && `: ${subcategory.name}`}
      </h2>
      <hr class="h-px mb-8 mt-6 bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <>
        <ProductsGridContainer>
          {products &&
            products?.map((product, index) => (
              <ProductPreview key={product.id + index} productInfo={product} />
            ))}
        </ProductsGridContainer>
      </>
    </div>
  );
}
