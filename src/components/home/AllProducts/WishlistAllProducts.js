import React from "react";
import ProductsSection from "../Products/ProductsSection";
import ProductsGridContainer from "../Products/ProductsGridContainer";
import ProductPreview from "../Products/wishlistProduct";
function WishlistProducts({ products }) {
  return (
    <ProductsSection heading="My Wishlist ">
      <ProductsGridContainer>
        {products?.length > 0 &&
          products?.map((product, index) => (
            <ProductPreview key={product.id + index} productInfo={product} />
          ))}
      </ProductsGridContainer>
    </ProductsSection>
  );
}

export default WishlistProducts;
