import React, { useEffect, useReducer } from 'react';

import PageLayout from '../../components/designLayouts/PageLayout';
import ProductDetails from './ProductDetails';
import { fetchProduct } from '../../APIs/Product';
import { useParams } from 'react-router-dom';
import SkeletonSpinner from '../../components/SkeletonSpinner';
import { useSelector } from 'react-redux';

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        productDetails: action.payload,
        status: 'ready',
        price: action.payload.price,
        id: action.payload.id,
        activeImage: action.payload.productImages.productThumbnail,
      };

    case 'activeImageChanged':
      return {
        ...state,
        activeImage: action.payload,
      };

    case 'sizeSelected':
      return {
        ...state,
        selectedMeasurement: action.payload,
      };

    case 'colorSelected':
      return {
        ...state,
        selectedColor: action.payload,
      };

    default:
      return state;
  }
};

const initialState = {
  productDetails: {},
  selectedColor: null,
  selectedMeasurement: null,
  price: null,
  qunatity: null,
  items: null,
  id: null,
  activeImage: null,
  // 'loading', 'ready', 'error
  status: 'loading',
};

const Product = () => {
  const { id } = useParams();
  const [product, dispatch] = useReducer(reducer, initialState);

  // Fetch Product
  useEffect(() => {
    async function getProduct() {
      try {
        const product = await fetchProduct(id);

        dispatch({
          type: 'dataReceived',
          payload: product,
        });
      } catch (error) {
        console.error(error);
      }
    }

    getProduct();
  }, [id]);

  return (
    <>
      <PageLayout>
        {product.status === 'loading' && (
          <div className='max-w-container mx-auto px-4'>
            <SkeletonSpinner />
          </div>
        )}

        {product.status === 'ready' && (
          <ProductDetails product={product} dispatch={dispatch} />
        )}
      </PageLayout>
    </>
  );
};

export default Product;
