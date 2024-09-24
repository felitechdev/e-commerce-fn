import React from "react";
import { ProductClassCategories } from "./ProductClassCategories";
import { ProductSection } from "./ProductSection";
import { useSelector } from "react-redux";
const ProductDisplay = () => {
  return (
    <div className="product-display">
      {/* <ProductClassCategories /> */}
      <ProductSection />
    </div>
  );
};

export default ProductDisplay;
