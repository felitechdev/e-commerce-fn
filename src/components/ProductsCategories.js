import React, { useState } from 'react';
import Banner from './Banner/Banner';
import NewArrivals from './home/ProductsSections/NewArrivals';
import YearProduct from './home/YearProduct/YearProduct';
import Recommendations from './home/ProductsSections/Recommendations';
import AllProducts from './home/AllProducts/AllProducts';
import CategoryFilteredProducts from './home/AllProducts/CategoryFilteredProducts';

const ProductsCategories = () => {
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
    <div className='w-full mx-auto '>
      <Banner
        onCategorySelect={handleCategorySelect}
        allcategory={selectedCategory.category.categoryId}
        allcatesubcategory={selectedCategory.subcategory.subcategoryId}
        onViewAllClick={handleViewAllClick}
      />
      {selectedCategory.category.categoryId ||
      selectedCategory.subcategory.subcategoryId ? (
        <div className='max-w-container mx-auto px-4'>
          <CategoryFilteredProducts selectedCategory={selectedCategory} />
        </div>
      ) : (
        <>
          <div className='max-w-container mx-auto px-4'>
            <Recommendations />
          </div>
          <NewArrivals />
          <div className='max-w-container mx-auto px-4'>
            <AllProducts />
            <YearProduct />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsCategories;
