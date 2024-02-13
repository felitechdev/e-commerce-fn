import React, { useState, useEffect } from 'react';
import Product from '../Products/Product';
import ProductsSection from '../Products/ProductsSection';
import ProductsSliderContainer from '../Products/ProductsSliderContainer';

const Recommendations = (props) => {
  console.log('Recomendations', props);
  return (
    <ProductsSection heading='Recommended Products'>
      <ProductsSliderContainer>
        {props.products?.products?.length > 0 &&
          props.products?.products?.map((product, index) => (
            <Product key={product.id + index} productInfo={product} />
          ))}
      </ProductsSliderContainer>
    </ProductsSection>
  );
};

export default Recommendations;
