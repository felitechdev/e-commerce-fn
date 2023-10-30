import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsGridContainer from "../Products/ProductsGridContainer";

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  // Duplicating the products (e.g., repeat 3 times)
  const duplicatedProducts = [...products, ...products, ...products];

  return (
    <ProductsSection heading="Our products">
      <ProductsGridContainer>
        {duplicatedProducts.map((product, index) => (
            <Product
              key={product._id + index} // Ensured unique keys for each product
              productInfo={product}
            />
          ))}
      </ProductsGridContainer>
    </ProductsSection>
  );
};

export default AllProducts;