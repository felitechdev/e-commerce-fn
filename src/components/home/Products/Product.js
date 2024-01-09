import React from "react";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useCurrency } from "../../Currency/CurrencyProvider/CurrencyProvider";
import DisplayCurrency from "../../Currency/DisplayCurrency/DisplayCurrency";
import { BsCart3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, removeToCart } from "../../../redux/Reducers/cartRecuder";
import { useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";

// change i made
const Product = ({ productInfo }) => {
  const rootId = productInfo.id;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { fromCurrency, toCurrency, getConvertedAmount } = useCurrency();
  const cart = useSelector((state) => state.cart);

  const cartTotal = cart.reduce((total, product) => total + product.items, 0);

  console.log("cartTotal:", cartTotal, cart);

  // check if product is in cart
  const productInCart = cart.find((product) => product.id === rootId);
  console.log("productInCart:", productInCart);

  const currentPathName = location.pathname;

  const handleProductDetails = () => {
    const separatedRoute = currentPathName.split("/");
    if (separatedRoute[1] === "accounts") {
      navigate("/accounts/product", {
        state: {
          productId: productInfo.id,
        },
      });
    } else {
      navigate("/product", {
        state: {
          productId: productInfo.id,
        },
      });
    }
  };

  const handleAddCart = (event) => {
    event.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart"));

    if (!cart) {
      cart = [];
    }

    let existingProduct = cart.find((product) => product.id === productInfo.id);

    if (!existingProduct) {
      return;
    } else if (existingProduct.items > 0) {
      existingProduct.items -= 1;
    } else {
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        productThumbnail: productInfo.productImages.productThumbnail,
        items: 1,
      };
      cart.push(existingProduct);
    }

    // Dispatch the addToCart action to update the Redux state
    dispatch(addToCart(existingProduct));

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleRemoveCart = (event) => {
    event.stopPropagation();
    dispatch(removeToCart(productInfo));

    localStorage.setItem("cart", JSON.stringify(cart));
  };

  let headerIconStyles =
    "  ml-2  inline-block lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] lg:hover:rounded-full py-1.5 px-2.5";
  return (
    <div
      className="w-full h-64 relative group border-2 border-gray-100 rounded-md cursor-pointer"
      onClick={handleProductDetails}
    >
      {productInfo.productImages !== undefined ? (
        <>
          <div className="max-w-80 h-[70%] relative overflow-y-hidden ">
            <div>
              <Image
                className="min-w-full min-h-[100px] rounded-tl-md rounded-tr-md"
                imgSrc={productInfo.productImages.productThumbnail.url}
              />
            </div>
            <div className="absolute top-3 left-4">
              {productInfo.discountPercentage > 0 && (
                <Badge text={`- ${productInfo.discountPercentage}%`} />
              )}
            </div>
          </div>
          <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
            <div className="flex flex-col  font-titleFont">
              <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline">
                {productInfo.name}
              </h2>
              <div className="text-sm flex justify-between ">
                <div>
                  <div className="text-[#1D6F2B] font-semibold">
                    <DisplayCurrency
                      amount={
                        productInfo.discountPercentage > 0
                          ? productInfo.discountedPrice
                          : productInfo.price
                      }
                      currencyCode={toCurrency}
                    />
                  </div>
                  {productInfo.discountPercentage > 0 && (
                    <p className="text-[#00000080] line-through">
                      <DisplayCurrency
                        amount={productInfo.price}
                        currencyCode={toCurrency}
                      />
                    </p>
                  )}
                </div>

                {!productInCart ? (
                  <BsCart3
                    className={headerIconStyles}
                    onClick={(event) => handleAddCart(event)}
                    size={40}
                  />
                ) : (
                  <>
                    <BiMinus
                      className="text-[red] font-bold ml-2    hover:bg-[#E5E5E5] hover:rounded-full"
                      size={20}
                      onClick={(event) => handleRemoveCart(event)}
                    />

                    <p className=" mx-0 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-full  flex justify-center items-center  font-bold  border-[0.5px] border-[#fff]">
                      {productInCart && productInCart.items}
                    </p>

                    <BiPlus
                      size={20}
                      className="text-primary font-bold  hover:bg-[#E5E5E5] ml-0 hover:rounded-full"
                      onClick={(event) => handleAddCart(event)}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Product;
