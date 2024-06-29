import React from "react";

import Badge from "./Badge";
import { useNavigate, useLocation } from "react-router-dom";
import DisplayCurrency from "../../Currency/DisplayCurrency/DisplayCurrency";
import { BsCart3 } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart, removeToCart } from "../../../redux/Reducers/cartRecuder";
import { useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import Image from "../../designLayouts/Image";
import { FiHeart } from "react-icons/fi";
import { addTowishlist } from "../../../redux/Reducers/wishlist";
import { removeTowishlist } from "../../../redux/Reducers/wishlist";
import discountedFinalPrice from "../../../util/discountedFinalPrice";
// change i made
const ProductPreview = ({ productInfo }) => {
  const rootId = productInfo.id;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  // check if product is in cart
  const productInCart = cart.find((product) => product.id === rootId);
  const productInwhishlist = wishlist.find((product) => product.id === rootId);
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
      navigate(`/products/${productInfo.id}`);
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
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: discountedFinalPrice(
          productInfo.price,
          productInfo.discountPercentage
        ),
        productThumbnail: productInfo.productThumbnail.url,
        seller: productInfo.seller,
        discountPercentage: productInfo?.discountPercentage,
        items: 1,
      };
      cart.push(existingProduct);
    } else {
      existingProduct.items += 1;
    }

    // Dispatch the addToCart action to update the Redux state
    dispatch(addToCart(existingProduct));

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const handleRemoveCart = (event) => {
    event.stopPropagation();

    let existingCart = JSON.parse(localStorage.getItem("cart"));
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
    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  const handleAddwishlist = (event) => {
    event.stopPropagation();

    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (!wishlist) {
      wishlist = [];
    }

    let existingProduct = wishlist.find(
      (product) => product.id === productInfo.id
    );

    if (!existingProduct) {
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: productInfo.price,
        productThumbnail: productInfo.productThumbnail.url,
        seller: productInfo.seller,
        discountPercentage: productInfo?.discountPercentage,
        items: 1,
      };
      wishlist.push(existingProduct);
    } else {
      // existingProduct.items += 0;
    }

    // Dispatch the addTowishlist action to update the Redux state
    dispatch(addTowishlist(existingProduct));

    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleRemovewishlist = (event) => {
    event.stopPropagation();

    let existingwishlist = JSON.parse(localStorage.getItem("wishlist"));
    let existingProduct = existingwishlist.find(
      (product) => product.id === productInfo.id
    );

    // Dispatch the removeTowishlist action to update the Redux state
    dispatch(removeTowishlist(existingProduct));

    // Update localStorage
    if (existingProduct.items > 1) {
      existingProduct.items -= 1;
    } else {
      existingwishlist = existingwishlist.filter(
        (product) => product.id !== existingProduct.id
      );
    }
    localStorage.setItem("wishlist", JSON.stringify(existingwishlist));
  };

  let headerIconStyles =
    "  ml-2  inline-block hover:text-[#1D6F2B] hover:bg-[#E5E5E5] hover:rounded-full py-1.5 px-2.5";
  return (
    <div
      className="w-full h-64 relative group border-2 border-gray-100 rounded-md cursor-pointer"
      onClick={handleProductDetails}
    >
      {productInfo.productThumbnail !== undefined ? (
        <>
          <div className="max-w-80 h-[70%]  relative overflow-y-hidden ">
            {/* <div className=""> */}

            {productInwhishlist ? (
              <FiHeart
                className="absolute text-[red] right-2 top-2 bg-red-100 hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
                size={40}
                onClick={(event) => handleRemovewishlist(event)}
              />
            ) : (
              <FiHeart
                className="absolute right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
                size={40}
                onClick={(event) => handleAddwishlist(event)}
              />
            )}

            <Image
              className=" w-full h-full object-cover  rounded-tl-md rounded-tr-md"
              imgSrc={productInfo.productThumbnail.url}
            />
            {/* </div> */}
            <div className="absolute top-3 left-4">
              {productInfo?.discountPercentage > 0 && (
                <Badge text={`- ${productInfo?.discountPercentage}%`} />
              )}
            </div>
          </div>
          <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
            <div className="flex flex-col  font-titleFont">
              <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline capitalize">
                {productInfo.name}
              </h2>
              <div className="text-sm flex justify-between ">
                <div>
                  {productInfo.discountPercentage <= 0 && (
                    <div className="text-[#1D6F2B] font-semibold">
                      <DisplayCurrency
                        product={productInfo}
                        isDiscount={false}
                      />
                    </div>
                  )}
                  {productInfo.discountPercentage > 0 && (
                    <>
                      <div className=" text-[#1D6F2B] font-semibold  ">
                        <DisplayCurrency
                          product={productInfo}
                          isDiscount={true}
                        />
                      </div>

                      <div className=" text-[#00000080] font-semibold line-through">
                        <DisplayCurrency
                          product={productInfo}
                          isDiscount={false}
                        />
                      </div>
                    </>
                  )}
                </div>

                {!productInCart || productInCart.items == 0 ? (
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

export default ProductPreview;
