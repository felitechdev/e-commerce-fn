import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { fetchProducts } from './apis.js';
import { useSearchParams } from 'react-router-dom';
import { Loader } from '../../../dashboard/Components/Loader/LoadingSpin.jsx';
import ProductsGridContainer from '../../../components/home/Products/ProductsGridContainer.js';
import ProductPreview from '../../../components/home/Products/Product.js';

export default function ShopProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.toString();

  const queryString = query && `?${query}`;

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: [`products-${queryString}`],
    queryFn: () => fetchProducts(queryString),
    retry: false,
  });

  return (
    <div>
      {isLoading && (
        <div className='flex justify-center'>
          <Loader fontSize={38} />
        </div>
      )}

      {error && <span>{error?.message}</span>}

      {!isLoading && !error && (
        <ProductsGridContainer>
          {products &&
            products?.map((product, index) => (
              <ProductPreview key={product.id + index} productInfo={product} />
            ))}
        </ProductsGridContainer>
      )}
    </div>
  );
}
