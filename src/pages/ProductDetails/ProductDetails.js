import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../APIs/Product';
import SkeletonSpinner from '../../components/SkeletonSpinner';
import ProductImages from './ProductImages';
import ProductMainInfo from './ProductMainInfo';
import CheckoutDetails from './CheckoutDetails';
import ProductPreview from '../../components/home/Products/Product';
import ProductsSliderContainer from '../../components/home/Products/ProductsSliderContainer';
import ProductsSection from '../../components/home/Products/ProductsSection';
import ProductSecondaryInfo from './ProductSecondaryInfo';
import { useSelector } from 'react-redux';

export default function ProductDetails({ product, dispatch }) {
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [DBProductInfo, setDBProductInfo] = useState(null);
  const [similarProducts, setSmilarProducts] = useState([]);

  const [cartItemInfo, setCartItemInfo] = useState({
    productDBId: id,
    quantity: 0,
    colorId: '',
    size: '',
  });

  return (
    <div className='w-full mx-auto border-b-[1px] border-b-gray-300'>
      <div className='max-w-container mx-auto p-4 mt-10'>
        <div className='w-full  h-full -mt-5 xl:-mt-8 pb-10'>
          <div className='flex flex-col gap-14'>
            <div className='flex flex-col mdl:flex-row mdl:flex-wrap gap-12 items-center'>
              <>
                <ProductImages
                  productImages={product.productDetails.productImages}
                  activeImage={product.activeImage}
                  dispatch={dispatch}
                />
                <ProductMainInfo
                  product={product.productDetails}
                  dispatch={dispatch}
                  selectedMeasurement={product.selectedMeasurement}
                  selectedColor={product.selectedColor}
                  activeImage={product.activeImage}
                />
                <CheckoutDetails product={product} />

                <ProductSecondaryInfo
                  product={product.productDetails}
                />
              </>
            </div>
          </div>
          {/* For testing similar products slider only */}
          {/* <ProductsSection heading='Similar Products'>
            <ProductsSliderContainer>
              {similarProducts.length &&
                similarProducts.map((product) => {
                  return (
                    <div key={product._id} className='px-2'>
                      <ProductPreview productInfo={product} />
                    </div>
                  );
                })}
            </ProductsSliderContainer>
          </ProductsSection> */}
        </div>
      </div>
    </div>
  );
}
