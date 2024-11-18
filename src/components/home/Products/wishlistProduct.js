import DisplayCurrency from "../../Currency/DisplayCurrency/DisplayCurrency";
import { BsCart3 } from "react-icons/bs";

import { addToCart, removeToCart } from "../../../redux/Reducers/cartRecuder";

import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import Image from "../../designLayouts/Image";
import { FiHeart } from "react-icons/fi";
import { addTowishlist } from "../../../redux/Reducers/wishlist";
import { removeTowishlist } from "../../../redux/Reducers/wishlist";
import discountedFinalPrice from "../../../util/discountedFinalPrice";

import React, { useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { newimage } from "../../../assets/images";

import { ImageSkeleton } from "../../SkeletonSpinner";
import Badge from "./Badge";

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
            productInfo.discountPercentage,
          ),
        ),
        productThumbnail: productInfo?.productThumbnail.url,
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
      (product) => product.id === productInfo.id,
    );

    // Dispatch the removeToCart action to update the Redux state
    dispatch(removeToCart(existingProduct));

    // Update localStorage
    if (existingProduct.items > 1) {
      existingProduct.items -= 1;
    } else {
      existingCart = existingCart.filter(
        (product) => product.id !== existingProduct.id,
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
      (product) => product.id === productInfo.id,
    );

    if (!existingProduct) {
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: Math.trunc(
          await discountedFinalPrice(
            productInfo.price,
            productInfo.discountPercentage,
          ),
        ),
        productThumbnail: productInfo?.productThumbnail?.url,
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

  const handleRemovewishlist = (event) => {
    event.stopPropagation();

    let existingwishlist = JSON.parse(localStorage.getItem("wishlist"));
    let existingProduct = existingwishlist.find(
      (product) => product.id === productInfo.id,
    );

    // Dispatch the removeTowishlist action to update the Redux state
    dispatch(removeTowishlist(existingProduct));

    // Update localStorage
    if (existingProduct.items > 1) {
      existingProduct.items -= 1;
    } else {
      existingwishlist = existingwishlist.filter(
        (product) => product.id !== existingProduct.id,
      );
    }
    localStorage.setItem("wishlist", JSON.stringify(existingwishlist));
  };

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  let headerIconStyles = "hover:text-[#1D6F2B] !rounded-full ";

  const productThumbnail = productInfo?.productThumbnail?.url.replace(
    productInfo?.productThumbnail?.url.split("/")[6],
    "w_300,h_300",
  );

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl border hover:shadow-lg"
      onClick={handleProductDetails}
    >
      {isCreatedinthreedays && (
        <img
          src={newimage}
          alt=""
          className="w-15 absolute -left-1.5 -top-1.5 z-40 h-12 rounded-tl-lg"
        />
      )}
      <div className="mb-1 aspect-square w-full overflow-hidden">
        {productInwhishlist ? (
          <IoMdHeart
            className="absolute right-2 top-2 cursor-pointer rounded-full bg-[#dff9e3] px-1.5 py-1.5 text-[#1D6F2B] hover:bg-[#E5E5E5]"
            size={30}
            onClick={(event) => handleRemovewishlist(event)}
          />
        ) : (
          <IoIosHeartEmpty
            className="absolute right-2 top-2 cursor-pointer rounded-full bg-white px-1.5 py-1.5 hover:bg-[#E5E5E5] hover:text-[#1D6F2B]"
            size={30}
            onClick={(event) => handleAddwishlist(event)}
          />
        )}

        {/* {isImageLoading && <ImageSkeleton />}{" "} */}
        <img
          src={productThumbnail && productThumbnail}
          alt=""
          // onLoad={handleImageLoad}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between px-2 pb-2">
        <div>
          <h2 className="line-clamp-2 text-ellipsis text-sm font-[500] capitalize text-primeColor">
            {productInfo.name}{" "}
          </h2>
          {/* <p className="text-gray-500">{productInfo?.price} RWF</p> */}

          <div className="flex justify-between text-sm">
            <div>
              {productInfo.discountPercentage <= 0 && (
                <div className="font-medium text-[#1D6F2B]">
                  <DisplayCurrency product={productInfo} isDiscount={true} />
                </div>
              )}
              {productInfo.discountPercentage > 0 && (
                <>
                  <div className="font-medium text-[#1D6F2B]">
                    <DisplayCurrency product={productInfo} isDiscount={true} />
                  </div>

                  <div className="font-medium text-[#00000080] line-through">
                    <DisplayCurrency product={productInfo} isDiscount={false} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {!productInCart || productInCart.items === 0 ? (
          <div
            className="absolute bottom-2 right-1 flex items-center gap-1"
            onClick={(event) => handleAddCart(event)}
          >
            <IoCartOutline
              className={headerIconStyles}
              onClick={(event) => handleAddCart(event)}
              size={20}
            />
          </div>
        ) : (
          <div
            className="gap- absolute bottom-2 right-1 flex items-center rounded-full border bg-white p-1"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <BiMinus
              className="font-semibold text-[red] hover:rounded-full"
              size={18}
              onClick={(event) => handleRemoveCart(event)}
            />
            <p className="mx-0 flex h-4 w-4 items-center justify-center rounded-full border-[0.5px] border-[#fff] text-sm font-semibold text-black">
              {productInCart && productInCart.items}
            </p>
            <BiPlus
              size={18}
              className="ml-0 font-semibold text-primary hover:rounded-full"
              onClick={(event) => {
                handleAddCart(event);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// const ProductPreview = ({ productInfo }) => {
//   const rootId = productInfo.id;
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const wishlist = useSelector((state) => state.wishlist);

//   // check if product is in cart
//   const productInCart = cart.find((product) => product.id === rootId);
//   const productInwhishlist = wishlist.find((product) => product.id === rootId);
//   const currentPathName = location.pathname;

//   const handleProductDetails = () => {
//     const separatedRoute = currentPathName.split("/");
//     if (separatedRoute[1] === "accounts") {
//       navigate("/accounts/product", {
//         state: {
//           productId: productInfo.id,
//         },
//       });
//     } else {
//       navigate(`/products/${productInfo.id}`);
//     }
//   };

//   const handleAddCart = async (event) => {
//     event.stopPropagation();

//     let cart = JSON.parse(localStorage.getItem("cart"));

//     if (!cart) {
//       cart = [];
//     }

//     let existingProduct = cart.find((product) => product.id === productInfo.id);

//     if (!existingProduct) {
//       existingProduct = {
//         id: productInfo.id,
//         name: productInfo.name,
//         price: Math.trunc(
//           await discountedFinalPrice(
//             productInfo.price,
//             productInfo.discountPercentage
//           )
//         ),
//         productThumbnail: productInfo?.productThumbnail.url,
//         seller: productInfo.seller,
//         discountPercentage: productInfo?.discountPercentage,
//         items: 1,
//       };
//       if (productInfo.hasMeasurements || productInfo.hasColors) {
//         navigate(`/products/${productInfo.id}`);
//       } else {
//         cart.push(existingProduct);
//         dispatch(addToCart(existingProduct));
//       }
//     } else {
//       existingProduct.items += 1;

//       dispatch(addToCart({ ...existingProduct }));
//     }
//     // Update localStorage
//     localStorage.setItem("cart", JSON.stringify(cart));
//   };

//   const handleRemoveCart = (event) => {
//     event.stopPropagation();

//     let existingCart = JSON.parse(localStorage.getItem("cart"));
//     let existingProduct = existingCart.find(
//       (product) => product.id === productInfo.id
//     );

//     // Dispatch the removeToCart action to update the Redux state
//     dispatch(removeToCart(existingProduct));

//     // Update localStorage
//     if (existingProduct.items > 1) {
//       existingProduct.items -= 1;
//     } else {
//       existingCart = existingCart.filter(
//         (product) => product.id !== existingProduct.id
//       );
//     }
//     localStorage.setItem("cart", JSON.stringify(existingCart));
//   };

//   const handleAddwishlist = async (event) => {
//     event.stopPropagation();

//     let wishlist = JSON.parse(localStorage.getItem("wishlist"));

//     if (!wishlist) {
//       wishlist = [];
//     }

//     let existingProduct = wishlist.find(
//       (product) => product.id === productInfo.id
//     );

//     if (!existingProduct) {
//       existingProduct = {
//         id: productInfo.id,
//         name: productInfo.name,
//         price: Math.trunc(
//           await discountedFinalPrice(
//             productInfo.price,
//             productInfo.discountPercentage
//           )
//         ),
//         productThumbnail: productInfo.productImages?.productThumbnail,
//         seller: productInfo.seller,
//         discountPercentage: productInfo?.discountPercentage,
//         items: 1,
//       };
//       wishlist.push(existingProduct);
//     } else {
//       // existingProduct.items += 0;
//     }

//     // Dispatch the addTowishlist action to update the Redux state
//     dispatch(addTowishlist(existingProduct));

//     // Update localStorage
//     localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   };

//   const handleRemovewishlist = (event) => {
//     event.stopPropagation();

//     let existingwishlist = JSON.parse(localStorage.getItem("wishlist"));
//     let existingProduct = existingwishlist.find(
//       (product) => product.id === productInfo.id
//     );

//     // Dispatch the removeTowishlist action to update the Redux state
//     dispatch(removeTowishlist(existingProduct));

//     // Update localStorage
//     if (existingProduct.items > 1) {
//       existingProduct.items -= 1;
//     } else {
//       existingwishlist = existingwishlist.filter(
//         (product) => product.id !== existingProduct.id
//       );
//     }
//     localStorage.setItem("wishlist", JSON.stringify(existingwishlist));
//   };

//   let headerIconStyles =
//     "  ml-2  inline-block hover:text-[#1D6F2B] bg-[#E5E5E5] hover:bg-[#E5E5E5] rounded-full py-1.5 px-2.5";
//   return (
//     <div
//       className="w-full h-64 relative group border-2 border-gray-100 rounded-md cursor-pointer"
//       // onClick={handleProductDetails}
//       // className="w-full h-fit relative group border-2 border-gray-100 rounded-md cursor-pointer"
//       onClick={handleProductDetails}
//     >
//       {productInfo?.productThumbnail !== undefined ? (
//         <>
//           <div className="max-w-80 h-[70%]  relative overflow-y-hidden ">
//             {/* <div className=""> */}

//             {productInwhishlist ? (
//               <FiHeart
//                 className="absolute text-[red] right-2 top-2 bg-red-100 hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
//                 size={40}
//                 onClick={(event) => handleRemovewishlist(event)}
//               />
//             ) : (
//               <FiHeart
//                 className="absolute right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
//                 size={40}
//                 onClick={(event) => handleAddwishlist(event)}
//               />
//             )}
//             <div className="m-2 ">
//               {" "}
//               <Image
//                 className=" w-full h-full object-cover  rounded-tl-md rounded-tr-md"
//                 imgSrc={productInfo?.productThumbnail.url}
//               />
//             </div>

//             {/* </div> */}
//             <div className="absolute top-3 left-4">
//               {productInfo?.discountPercentage > 0 && (
//                 <Badge text={`- ${productInfo?.discountPercentage}%`} />
//               )}
//             </div>
//           </div>
//           <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
//             <div className="flex flex-col  font-titleFont">
//               <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline capitalize">
//                 {productInfo.name.length > 40
//                   ? productInfo.name.substring(0, 40) + "..."
//                   : productInfo.name}
//               </h2>
//               <div className="text-sm flex justify-between ">
//                 <div>
//                   {productInfo.discountPercentage <= 0 && (
//                     <div className="text-[#1D6F2B] font-semibold">
//                       <DisplayCurrency
//                         product={productInfo}
//                         isDiscount={false}
//                       />
//                     </div>
//                   )}
//                   {productInfo.discountPercentage > 0 && (
//                     <>
//                       <div className=" text-[#1D6F2B] font-semibold  ">
//                         <DisplayCurrency
//                           product={productInfo}
//                           isDiscount={true}
//                         />
//                       </div>

//                       <div className=" text-[#00000080] font-semibold line-through">
//                         <DisplayCurrency
//                           product={productInfo}
//                           isDiscount={false}
//                         />
//                       </div>
//                     </>
//                   )}
//                 </div>

//                 {!productInCart || productInCart.items == 0 ? (
//                   <BsCart3
//                     className={headerIconStyles}
//                     onClick={(event) => handleAddCart(event)}
//                     size={40}
//                   />
//                 ) : (
//                   <>
//                     <BiMinus
//                       className="text-[red] font-semibold ml-2    hover:bg-[#E5E5E5] hover:rounded-full"
//                       size={20}
//                       onClick={(event) => handleRemoveCart(event)}
//                     />

//                     <p className=" mx-0 bg-[#1D6F2B] text-white text-[12px] w-6 h-6 rounded-full  flex justify-center items-center  font-semibold  border-[0.5px] border-[#fff]">
//                       {productInCart && productInCart.items}
//                     </p>

//                     <BiPlus
//                       size={20}
//                       className="text-primary font-semibold  hover:bg-[#E5E5E5] ml-0 hover:rounded-full"
//                       onClick={(event) => handleAddCart(event)}
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

export default ProductPreview;
