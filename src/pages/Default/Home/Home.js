import React, { useState } from "react";
import Banner from "../../../components/Banner/Banner";
import AllProducts from "../../../components/home/AllProducts/AllProducts";
import NewArrivals from "../../../components/home/ProductsSections/NewArrivals";
import YearProduct from "../../../components/home/YearProduct/YearProduct";
import CategoryFilteredProducts from "../../../components/home/AllProducts/CategoryFilteredProducts";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    category: {
      categoryname: null,
      categoryId: null,
    },
    subcategory: {
      subcategoryname: null,
      subcategoryId: null,
    },
  });

  const handleCategorySelect = (category, subcategory) => {
    if (category.categoryId) {
      setSelectedCategory({
        category: {
          categoryname: category.categoryname,
          categoryId: category.categoryId,
        },
        subcategory: { subcategoryname: null, subcategoryId: null },
      });
    } else if (subcategory.subcategoryId) {
      setSelectedCategory({
        category: { categoryname: null, categoryId: null },
        subcategory: {
          subcategoryname: subcategory.subcategoryname,
          subcategoryId: subcategory.subcategoryId,
        },
      });
    }
  };
  return (
    <div className="w-full mx-auto bg-black">
      {/* <Banner onCategorySelect={handleCategorySelect} /> */}
      {selectedCategory.category.categoryId ||
      selectedCategory.subcategory.subcategoryId ? (
        <div className="max-w-container mx-auto px-4">
          <CategoryFilteredProducts selectedCategory={selectedCategory} />
        </div>
      ) : (
        <>
          <NewArrivals />
          <div className="max-w-container mx-auto px-4">
            {/* <AllProducts />
            <YearProduct /> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
