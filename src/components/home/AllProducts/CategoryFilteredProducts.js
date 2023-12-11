import React, { useState, useEffect } from "react";
import Product from "../Products/Product";
import ProductsSection from "../Products/ProductsSection";
import ProductsGridContainer from "../Products/ProductsGridContainer";

const CategoryFilteredProducts = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetching data from the API based on selectedCategory(category or subcategory)
    console.log(selectedCategory);
    const url = selectedCategory.category.categoryId || selectedCategory.subcategory.subcategoryId
      ? (selectedCategory.category.categoryId ?
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/products/category/${selectedCategory.category.categoryId}`
        :`${process.env.REACT_APP_BACKEND_SERVER_URL}/products/subcategory/${selectedCategory.subcategory.subcategoryId}`) 
      : `${process.env.REACT_APP_BACKEND_SERVER_URL}/products`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [selectedCategory]);

  return (
    <ProductsSection heading={selectedCategory.category.categoryname || selectedCategory.subcategory.subcategoryname}>
      {products.length > 0 ? (
        <ProductsGridContainer>
        {products.map((product, index) => (
            <Product
              key={product._id + index} // Ensured unique keys for each product
              productInfo={product}
            />
          
          ))}
          </ProductsGridContainer>) : <p className=" text-center font-semibold">There are no products in these category.</p>}
      
    </ProductsSection>
  );
};

export default CategoryFilteredProducts;
