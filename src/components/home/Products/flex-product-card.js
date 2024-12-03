import React, { useState } from "react";
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { BiMinus, BiPlus } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addToCart, removeToCart } from "../../../redux/Reducers/cartRecuder";
import { addTowishlist } from "../../../redux/Reducers/wishlist";
import discountedFinalPrice from "../../../util/discountedFinalPrice";
import DisplayCurrency from "../../Currency/DisplayCurrency/DisplayCurrency";

export const FlexProductPreview = ({ productInfo }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);

  const productInCart = cart.find((product) => product.id === productInfo.id);
  const productInWishlist = wishlist.find(
    (product) => product.id === productInfo.id,
  );

  const handleAddCart = async (event) => {
    event.stopPropagation();
    dispatch(addToCart(productInfo));
  };

  const handleRemoveCart = (event) => {
    event.stopPropagation();
    dispatch(removeToCart(productInfo));
  };

  const handleWishlist = (event) => {
    event.stopPropagation();
    dispatch(addTowishlist(productInfo));
  };

  const handleImageLoad = () => setIsImageLoading(false);

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

  const productThumbnail =
    productInfo.productImages.productThumbnail.url.replace(
      productInfo.productImages.productThumbnail.url.split("/")[6],
      "w_300,h_300",
    );

  return (
    <div
      className="grid w-full grid-cols-1 justify-items-start rounded-lg border p-4 shadow-md hover:shadow-lg sm:grid-cols-[1fr_2fr]"
      onClick={handleProductDetails}
    >
      {" "}
      {/* Wishlist Button */}
      <div className="absolute right-4 top-4">
        {productInWishlist ? (
          <IoMdHeart
            className="cursor-pointer text-red-500"
            size={24}
            onClick={handleWishlist}
          />
        ) : (
          <IoIosHeartEmpty
            className="cursor-pointer text-gray-500"
            size={24}
            onClick={handleWishlist}
          />
        )}
      </div>
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden rounded-md bg-gray-200">
        {isImageLoading && (
          <div className="h-full w-full animate-pulse bg-gray-300"></div>
        )}
        <img
          src={productInfo.productImages?.productThumbnail.url}
          //   src={productThumbnail && productThumbnail}
          alt={productInfo.name}
          className="h-full w-full object-cover"
          onLoad={handleImageLoad}
        />
      </div>
      <div className="ml-5">
        {" "}
        {/* Product Details */}
        <div className="ml-0 mt-0 flex flex-col space-y-2">
          <h3 className="text-lg text-gray-800">{productInfo.name}</h3>

          {productInfo?.description?.length > 0 && (
            <p
              className="w-full overflow-auto break-words p-0 text-sm text-gray-600"
              dangerouslySetInnerHTML={{
                __html:
                  productInfo?.description?.length > 100
                    ? productInfo?.description.substring(0, 100) + "..."
                    : productInfo?.description,
              }}
            ></p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">
              <DisplayCurrency product={productInfo} isDiscount={true} />
            </span>
            {productInfo.discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                <DisplayCurrency product={productInfo} isDiscount={false} />
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex items-start justify-between">
          {!productInCart || productInCart.items === 0 ? (
            <button
              onClick={handleAddCart}
              className="hover:bg-primary-dark flex items-center rounded bg-primary px-4 py-2 text-sm font-medium text-white"
            >
              <IoCartOutline size={20} className="mr-2" />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleRemoveCart}
                className="flex h-8 w-8 items-center justify-center rounded bg-red-500 text-white hover:bg-red-600"
              >
                <BiMinus />
              </button>
              <span className="text-lg font-semibold">
                {productInCart?.items}
              </span>
              <button
                onClick={handleAddCart}
                className="hover:bg-primary-dark flex h-8 w-8 items-center justify-center rounded bg-primary text-white"
              >
                <BiPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
