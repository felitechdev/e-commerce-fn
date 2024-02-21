import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  addToCart,
  removeToCart,
} from '../../redux/Reducers/cartRecuder';
import { useNavigate } from 'react-router-dom';
import AlertComponent from '../../components/designLayouts/AlertComponent';

const CheckoutDetails = ({ product }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Look for the current product in cart
  const productInTheCart = cart.find(
    (item) => item.id === product.productDetails.id
  );

  const ValidateCartInfo = () => {
    if (productInTheCart?.items === 0) {
      setErrorMessage(
        'Please select the quantity before proceeding.'
      );
      return false;
    } else if (
      product.productDetails.hasColors &&
      !product.selectedColor
    ) {
      setErrorMessage('Please select color.');
      return false;
    } else if (
      product.productDetails.hasMeasurements &&
      !product.selectedMeasurement
    ) {
      setErrorMessage('Please select size.');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleAddToCart = () => {
    const validateCart = ValidateCartInfo();
    if (!validateCart) {
      return false;
    }

    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      cart = [];
    }

    let existingProduct = cart.find(
      (item) => item.id === product.productDetails.id
    );

    if (
      existingProduct.items + 1 >
      product.productDetails.stockQuantity
    ) {
      setErrorMessage(
        `Quantity cannot exceed ${product.productDetails.stockQuantity} availble`
      );
      return false;
    }

    if (!existingProduct) {
      existingProduct = {
        id: product.productDetails.id,
        name: product.productDetails.name,
        ...(product.selectedColor || product.selectedMeasurement
          ? {
              variations: {
                ...(product.selectedColor && {
                  color: product.selectedColor,
                }),

                ...(product.selectedMeasurement && {
                  [product.productDetails.colorMeasurementVariations
                    .measurementType]: product.selectedMeasurement,
                }),
              },
            }
          : null),
        price: product.productDetails.price,
        productThumbnail:
          product.productDetails.productImages.productThumbnail,
        items: 1,
      };
      cart.push(existingProduct);
    } else {
      existingProduct.items += 1;
    }

    // Dispatch the addToCart action to update the Redux state
    dispatch(addToCart(existingProduct));

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleRemoveCart = () => {
    let existingCart = JSON.parse(localStorage.getItem('cart'));
    let existingProduct = existingCart.find(
      (item) => item.id === product.productDetails.id
    );

    // Dispatch the removeToCart action to update the Redux state
    dispatch(removeToCart(existingProduct));

    // Update localStorage
    if (existingProduct.items > 1) {
      existingProduct.items -= 1;
    } else {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id
      );
    }
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  useEffect(() => {
    setErrorMessage('');
  }, []);

  // change i made
  return (
    <div className='flex flex-col sml:min-w-[300px] mdl:w-[20%] sml:max-h-[400px] gap-3 border-[2px] p-4 rounded-lg'>
      <div>
        <p className='text-base mb-2 block font-semibold'>Quantity</p>
        <div className='flex flex-row mb-1 gap-2 items-center text-center'>
          <button
            disabled={!productInTheCart}
            className='bg-[#E5E5E5] w-[20px] h-[20px] rounded-full text-sm font-bold cursor-pointer hover:bg-[#c8c9ca] disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleRemoveCart}>
            -
          </button>
          <p className='text-sm font-semibold' pattern='[0-9]*'>
            {productInTheCart?.items || 1}
          </p>
          <button
            className='bg-[#E5E5E5] w-[20px] h-[20px] rounded-full text-sm font-bold cursor-pointer hover:bg-[#c8c9ca]'
            onClick={handleAddToCart}>
            +
          </button>
        </div>
        <p className='text-xs text-[#00000080] '>
          {product.productDetails.stockQuantity}{' '}
          {product.productDetails.quantityParameter} available
        </p>
      </div>
      <div className='flex flex-col gap-2 mt-8'>
        {errorMessage && (
          <AlertComponent
            color='failure'
            type='Error!'
            message={errorMessage}
          />
        )}
        {!productInTheCart && (
          <button
            onClick={() => handleAddToCart()}
            className='hover:bg-[#f0f0f0] text-[#437a4c] cursor-pointer w-full text-base font-medium h-9 rounded-md duration-300 border-[2px] border-[#1D6F2B]'>
            Add to Cart
          </button>
        )}

        <button
          className='bg-[#1D6F2B] hover:bg-[#437a4c] text-white cursor-pointer w-full text-base font-medium h-9 rounded-md duration-300'
          onClick={() => navigate('/cart')}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetails;
