import React from 'react';
import SmallImagesContainer from './SmallImagesContainer';
import { useState } from 'react';

const ProductMainInfo = (props) => {
  const [selectedSize, setSelectedSize] = useState(null);

  const handleSizeClick = (e) => {
    const { itemvalue, itemlabel } = e.currentTarget.dataset;
    setSelectedSize({ itemvalue, itemlabel });
    props.setCartItemInfo({
      ...props.cartItemInfo,
      [`${itemlabel}`]: itemvalue,
    });
  };

  return (
    <div className='flex flex-col w-container lg:max-w-[30%] xl:w-[30%] gap-5 '>
      <div>
        <p className='w-full h-max-[65px] text-xl font-semibold block'>
          {props.DBProductInfo?.name}
        </p>
        <hr className='w-full h-0.5 border-0 bg-gray-200 my-3'></hr>
      </div>
      <div>
        <p className='text-lg mb-1 block font-semibold'>Price:</p>
        <p className='text-2xl text-[#1D6F2B] font-semibold'>
          {props.DBProductInfo?.discountPercentage > 0
            ? props.DBProductInfo?.discountedPrice
            : props.DBProductInfo?.price}{' '}
          RWF
        </p>
        {props.DBProductInfo?.discountPercentage > 0 ? (
          <p className='inline-block text-base text-[#00000080] font-normal line-through'>
            {props.DBProductInfo?.price} RWF
          </p>
        ) : (
          ''
        )}
        {props.DBProductInfo?.discountPercentage > 0 && (
          <p className='inline-block text-xs bg-[rgba(201,195,195,0.39)] py-[4px] px-[10px] ml-3 rounded-2xl text-[#FF4747] font-bold'>
            {props.DBProductInfo?.discountPercentage + '% off'}
          </p>
        )}
      </div>

      {/* TODO  Product Colors */}
      {/* {props.DBProductInfo?.productImages.colorImages.length > 0 && (
        <div>
          <p className='text-lg mb-1 block font-semibold'>
            Color: {props.cartItemInfo?.itemColorName}
          </p>
          <SmallImagesContainer
            imagesInfo={props.DBProductInfo?.productImages.colorImages}
            cartItemInfo={props.cartItemInfo}
            setCartItemInfo={props.setCartItemInfo}
            imageCategory='color-images'
          />
          
        </div>
      )} */}

      {props.DBProductInfo?.availableSizes.length > 0 && (
        <div>
          <p className='text-lg mb-1 block font-semibold'>Size:</p>
          <div className='flex flex-wrap gap-1'>
            {props.DBProductInfo?.availableSizes.map((size, index) => {
              return (
                <div
                  key={index}
                  className={`border-[2px] rounded-lg py-1 px-2 cursor-pointer text-sm ${
                    selectedSize &&
                    selectedSize.itemvalue === size &&
                    selectedSize.itemlabel === 'size'
                      ? 'item-selected'
                      : ''
                  }`}
                  data-itemvalue={size}
                  data-itemlabel='size'
                  onClick={handleSizeClick}
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMainInfo;
