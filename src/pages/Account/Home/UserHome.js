import React, { useState } from "react";
import Banner from "../../../components/Banner/Banner";
import NewArrivals from "../../../components/home/ProductsSections/NewArrivals";
import YearProduct from "../../../components/home/YearProduct/YearProduct";
import Recommendations from "../../../components/home/ProductsSections/Recommendations";
import AllProducts from "../../../components/home/AllProducts/AllProducts";
import CategoryFilteredProducts from "../../../components/home/AllProducts/CategoryFilteredProducts";

const UserHome = () => {
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
    console.log("category", category, "subcategory", subcategory);
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

  const handleViewAllClick = () => {
    setSelectedCategory({
      category: {
        categoryname: null,
        categoryId: null,
      },
      subcategory: {
        subcategoryname: null,
        subcategoryId: null,
      },
    });
  };

  return (
    <div className="w-full mx-auto ">
      <Banner
        onCategorySelect={handleCategorySelect}
        allcategory={selectedCategory.category.categoryId}
        allcatesubcategory={selectedCategory.subcategory.subcategoryId}
        onViewAllClick={handleViewAllClick}
      />
      {selectedCategory.category.categoryId ||
      selectedCategory.subcategory.subcategoryId ? (
        <div className="max-w-container mx-auto px-4">
          <CategoryFilteredProducts selectedCategory={selectedCategory} />
        </div>
      ) : (
        <>
          <div className="max-w-container mx-auto px-4">
            <Recommendations />
          </div>
          <NewArrivals />
          <div className="max-w-container mx-auto px-4">
            <AllProducts />
            <YearProduct />
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;
