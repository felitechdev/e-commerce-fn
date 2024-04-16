import React, { useMemo } from 'react';
import Banner from './Banner/Banner';
import AllProducts from './home/AllProducts/AllProducts';
import { Loader } from '../dashboard/Components/Loader/LoadingSpin';

import MobileCategoryNav from './MobileCategoryNav';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import Paginator from './Paginator';

export async function fetchProducts(page) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?limit=10&page=${page}&fields=name,price,discountPercentage,productImages.productThumbnail.url`
    );

    return response.data.data.products;
  } catch (error) {
    return [];
  }
}

function ProductsCategories() {
  const {
    data,
    isFetching,
    isLoading,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['products'],
    queryFn: ({ pageParam = 1 }) => {
      return fetchProducts(pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length
        ? allPages.length + 1
        : undefined;
    },
  });

  const products = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <div className='w-full mx-auto '>
      <MobileCategoryNav title='Shop by Categories' />
      <Banner />

      <div className='max-w-container mx-auto px-4'>
        {isLoading && (
          <div className='flex justify-center p-16'>
            <Loader />
          </div>
        )}

        {products && <AllProducts products={products} />}

        <Paginator
          isFetching={isFetching}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}

export default ProductsCategories;
