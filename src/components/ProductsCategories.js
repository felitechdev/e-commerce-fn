import React, { useEffect, useState } from 'react';
import Banner from './Banner/Banner';
import AllProducts from './home/AllProducts/AllProducts';
import CategoryFilteredProducts from './home/AllProducts/CategoryFilteredProducts';
import { Loader } from '../dashboard/Components/Loader/LoadingSpin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../APIs/Product';

function ProductsCategories() {
  const { status, products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

      <div className='max-w-container mx-auto px-4'>
        {status === 'loading' && !products.length && (
          <div className='flex justify-center p-16'>
            <Loader />
          </div>
        )}

        {products.length > 0 && <AllProducts products={products} />}
      </div>
    </div>
  );
}

export default ProductsCategories;
