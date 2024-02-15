import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToCart, removeToCart } from '../../redux/Reducers/cartRecuder';
import { useNavigate } from 'react-router-dom';

const CheckoutDetails = (props) => {
  console.log('Props', props);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Look for the current product in cart
  const productInTheCart = cart.find(
    (item) => item.id === props.DBProductInfo.id
  );

  const ValidateCartInfo = () => {
    if (productInTheCart?.items === 0) {
      setErrorMessage('Please select the quantity before proceeding.');
      return errorMessage;
    } else {
      return true;
    }
  };

  const productInfo = props.DBProductInfo;
  const handleAddToCart = () => {
    const validateCart = ValidateCartInfo();

    if (!validateCart) return;

    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart) {
      cart = [];
    }

    let existingProduct = cart.find((product) => product.id === productInfo.id);

    if (!existingProduct) {
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        productThumbnail: productInfo.productImages.productThumbnail,
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
      (product) => product.id === productInfo.id
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
  }, [props.cartItemInfo]);

  // change i made
  return (
    <div className='flex flex-col sml:min-w-[300px] mdl:w-[20%] sml:max-h-[400px] gap-3 border-[2px] p-4 rounded-lg'>
      {/* <div>
        <p className='text-base mb-1 block font-semibold'>Delivery</p>

        {props.DBProductInfo.deliveryInfo.length > 0 && (
          <div className="mb-3">
            <p className="text-sm mb-1 block font-normal">Delivery Fee: </p>
            <div className="flex flex-wrap gap-1">
              {props.DBProductInfo.deliveryInfo.map((deliveryInfo, index) => {
                return (
                  <div
                    key={index}
                    className={`border-[2px] rounded-lg py-1 px-2 cursor-pointer text-xs ${
                      selectedDelivery &&
                      selectedDelivery.itemvalue === deliveryInfo.deliveryFee &&
                      selectedDelivery.itemlabel === deliveryInfo.deliveryType
                        ? "item-selected"
                        : "border-gray-200"
                    }
                                        }`}
                    data-itemvalue={deliveryInfo.deliveryFee}
                    data-itemlabel="deliveryFee"
                    onClick={handleDeliveryChoice}
                  >
                    {`${deliveryInfo.deliveryFee} RWF ${deliveryInfo.deliveryType}`}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className='mb-3'>
          <p className='text-sm inline-block font-normal'>
            Estimated derivery:{' '}
          </p>
          <span className='text-sm ml-2'>30 - 60 minutes </span>
        </div>
        <hr className='w-full h-[1px] border-0 bg-gray-200 mb-3'></hr>
      </div> */}
      <div>
        <p className='text-base mb-2 block font-semibold'>Quantity</p>
        <div className='flex flex-row mb-1 gap-2 items-center text-center'>
          <button
            disabled={!productInTheCart}
            className='bg-[#E5E5E5] w-[20px] h-[20px] rounded-full text-sm font-bold cursor-pointer hover:bg-[#c8c9ca] disabled:opacity-50 disabled:cursor-not-allowed'
            onClick={handleRemoveCart}
          >
            -
          </button>
          <p className='text-sm font-semibold' pattern='[0-9]*'>
            {productInTheCart?.items || 1}
          </p>
          <button
            className='bg-[#E5E5E5] w-[20px] h-[20px] rounded-full text-sm font-bold cursor-pointer hover:bg-[#c8c9ca]'
            onClick={handleAddToCart}
          >
            +
          </button>
        </div>
        <p className='text-xs text-[#00000080] '>
          {props.DBProductInfo.stockQuantity}{' '}
          {props.DBProductInfo.quantityParameter} available
        </p>
      </div>
      <div className='flex flex-col gap-2 mt-8'>
        {errorMessage && <p className='text-red-600 text-xs'>{errorMessage}</p>}
        {!productInTheCart && (
          <button
            onClick={() => handleAddToCart()}
            className='hover:bg-[#f0f0f0] text-[#437a4c] cursor-pointer w-full text-base font-medium h-9 rounded-md duration-300 border-[2px] border-[#1D6F2B]'
          >
            Add to Cart
          </button>
        )}

        <button
          className='bg-[#1D6F2B] hover:bg-[#437a4c] text-white cursor-pointer w-full text-base font-medium h-9 rounded-md duration-300'
          onClick={() => navigate('/cart')}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default CheckoutDetails;
