import React from "react";
import ProductsSection from "../Products/ProductsSection";
import ProductsGridContainer from "../Products/ProductsGridContainer";
import ProductPreview from "../Products/Product";
import { FeliTechWhiteLogo } from "../../../assets/images";
import { FeliTechLogo_transparent } from "../../../assets/images";
function AllProducts({ products }) {
  return (
    <ProductsSection heading="Our Products">
      <ProductsGridContainer>
        {products?.length > 0 &&
          products?.map((product, index) => (
            <ProductPreview key={product.id + index} productInfo={product} />
          ))}
      </ProductsGridContainer>
    </ProductsSection>
  );
}

export default AllProducts;
