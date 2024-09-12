import React, { useState } from "react";

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
import discountedFinalPrice from "../../../util/discountedFinalPrice";
import { newimage } from "../../../assets/images";
import { ImageSkeleton } from "../../SkeletonSpinner";
import { getCloudinaryUrl } from "../../imageslider/ImageSlider";

// change i made
const ProductPreview = ({ productInfo }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const rootId = productInfo.id;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const createdAtDate = new Date(productInfo?.createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - createdAtDate;
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  const isCreatedinthreedays = daysDifference <= 20;

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

  const handleAddCart = async (event) => {
    event.stopPropagation();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existingProduct = cart.find((product) => product.id === productInfo.id);

    if (!existingProduct) {
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: Math.trunc(
          await discountedFinalPrice(
            productInfo.price,
            productInfo.discountPercentage
          )
        ),
        productThumbnail: productInfo.productImages.productThumbnail,
        seller: productInfo.seller,
        discountPercentage: productInfo?.discountPercentage,
        items: 1,
      };

      if (productInfo.hasMeasurements || productInfo.hasColors) {
        navigate(`/products/${productInfo.id}`);
      } else {
        cart.push(existingProduct);

        // Update local storage immediately
        localStorage.setItem("cart", JSON.stringify(cart));

        // Dispatch Redux action
        dispatch(addToCart(existingProduct));
      }
    } else {
      // Update items count
      existingProduct.items += 1;
      // Update local storage immediately
      localStorage.setItem("cart", JSON.stringify(cart));
      // Since we're updating the same product, we might need to update Redux with the new items count
      dispatch(addToCart({ ...existingProduct }));
    }
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

  const handleAddwishlist = async (event) => {
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
        price: Math.trunc(
          await discountedFinalPrice(
            productInfo.price,
            productInfo.discountPercentage
          )
        ),
        productThumbnail: productInfo.productImages.productThumbnail,
        seller: productInfo.seller,
        discountPercentage: productInfo?.discountPercentage,
        items: 1,
        hasColors: productInfo.hasColors,
        hasMeasurements: productInfo.hasMeasurements,
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

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  const optimizedImageUrl = getCloudinaryUrl(
    productInfo.productImages.productThumbnail.url,
    {
      width: 230,
      height: 240,
    }
  );
  let headerIconStyles =
    "hover:text-[#1D6F2B] bg-[#E5E5E5] hover:bg-[#E5E5E5]   w-7 h-7  !rounded-full p-1 ";
  return (
    <div
      className="w-full h-64  relative group border-2 bg-white border-gray-100 pb-1 rounded-md cursor-pointer"
      onClick={handleProductDetails}
    >
      {productInfo.productImages !== undefined ? (
        <>
          <div className="max-w-80 h-[70%]  relative overflow-y-hidden ">
            {isCreatedinthreedays && (
              <img
                src={newimage}
                alt=""
                className="w-15 h-12 absolute -top-1.5 -left-1.5 z-40  rounded-tl-lg "
              />
            )}
            {productInwhishlist ? (
              <FiHeart
                className="absolute text-[red] right-2 top-2 bg-red-100 hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
                size={40}
                onClick={(event) => handleAddwishlist(event)}
              />
            ) : (
              <FiHeart
                className="absolute right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
                size={40}
                onClick={(event) => handleAddwishlist(event)}
              />
            )}

            <div className="m-2 !h-full">
              {isImageLoading && <ImageSkeleton />}{" "}
              <Image
                className={`!w-[95%] m-auto !h-full  rounded-tl-md rounded-tr-md ${
                  isImageLoading ? "hidden" : ""
                }`}
                imgSrc={optimizedImageUrl}
                // imgSrc={productInfo.productImages.productThumbnail.url}
                onLoad={handleImageLoad} // Call when the image loads
              />
            </div>
            <div className="absolute  text-[red] top-3 left-4">
              {productInfo.discountPercentage > 0 && (
                <Badge text={`- ${productInfo.discountPercentage}%`} />
              )}
            </div>
          </div>
          <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-1">
            <div className="flex   font-titleFont space-x-1 justify-between ">
              <div className=" flex-col   text-left  flex-wrap w-[85%] ">
                <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline capitalize">
                  {productInfo.name.length > 40
                    ? productInfo.name.substring(0, 40) + "..."
                    : productInfo.name}{" "}
                </h2>
                <div className="text-sm   flex justify-between ">
                  <div>
                    {productInfo.discountPercentage <= 0 && (
                      <div className="text-[#1D6F2B] font-semibold">
                        <DisplayCurrency
                          product={productInfo}
                          isDiscount={true}
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
                </div>
              </div>

              {!productInCart || productInCart.items == 0 ? (
                <div
                  className=" flex items-center"
                  onClick={(event) => handleAddCart(event)}
                >
                  <BsCart3
                    className={headerIconStyles}
                    onClick={(event) => handleAddCart(event)}
                    size={40}
                  />
                </div>
              ) : (
                <div
                  className="  flex-row-reverse  items-center "
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <BiMinus
                    className="text-[red] font-bold    hover:bg-[#E5E5E5] hover:rounded-full"
                    size={20}
                    onClick={(event) => handleRemoveCart(event)}
                  />
                  <p className=" mx-0 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-full  flex justify-center items-center  font-bold  border-[0.5px] border-[#fff]">
                    {productInCart && productInCart.items}
                  </p>
                  <BiPlus
                    size={20}
                    className="text-primary font-bold  hover:bg-[#E5E5E5] ml-0 hover:rounded-full"
                    onClick={(event) => {
                      handleAddCart(event);
                    }}
                  />
                </div>
              )}
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
