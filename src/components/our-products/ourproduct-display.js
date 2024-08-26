import React from "react";
import { ProductClassCategories } from "./ProductClassCategories";
import { ProductSection } from "./ProductSection";
import { useSelector } from "react-redux";
const ProductDisplay = () => {
  return (
    <div className="product-display">
      <ProductClassCategories />
    </div>
  );
};

export default ProductDisplay;
