import React, { useEffect } from 'react';
import Banner from './Banner/Banner';
import AllProducts from './home/AllProducts/AllProducts';
import { Loader } from '../dashboard/Components/Loader/LoadingSpin';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../APIs/Product';

import MobileCategoryNav from './MobileCategoryNav';

function ProductsCategories() {
  const { status, products } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className='w-full mx-auto '>
      <MobileCategoryNav title='Shop by Categories' />
      <Banner />

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
