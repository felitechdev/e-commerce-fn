import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsGridContainer from "../Products/ProductsGridContainer";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Duplicate the products (e.g., repeat 3 times)
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <ProductsSection heading="Our products">
      <ProductsGridContainer>
        {duplicatedProducts.map((product, index) => (
            <Product
              key={product._id + index} // Ensure unique keys for each product
              img={product.productImages.productThumbnail.url}
              productName={product.name}
              price={product.price}
              color={product.colorName}
              badge={product.discountPercentage > 0} // You can change this based on your data
              discountPercentage={product.discountPercentage}
              discountedPrice={product.discountedPrice}
              des={product.description}
            />
          ))}
      </ProductsGridContainer>
    </ProductsSection>
  );
};

export default AllProducts;