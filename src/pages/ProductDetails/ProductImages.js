import { FiHeart } from "react-icons/fi";
import { useState } from "react";
import SmallImagesContainer from "./SmallImagesContainer";
import { useSelector } from "react-redux";
const ProductImages = ({
  activeImage,
  productImages,
  productId,
  dispatch,
  handleAddwishlist,
}) => {
  const wishlist = useSelector((state) => state.wishlist);
  const productInwhishlist = wishlist.find(
    (product) => product.id === productId
  );

  const [clicked, setClicked] = useState(false);

  console.log("productInwhishlist", wishlist, productInwhishlist, productId);
  const onClickHeart = (event) => {
    event.stopPropagation();
    handleAddwishlist(productId);
    setClicked(true);
  };

  return (
    <>
      <div className="mt-4 inline-block w-container lg:w-[35%]">
        <div className="flex flex-col gap-3 items-center">
          {/* <div className="relative max-w-[428px] max-h-[418px] rounded-md overflow-hidden"> */}
          <div className="relative  w-[428px] h-[418px] rounded-md overflow-hidden">
            {productInwhishlist || clicked ? (
              <FiHeart
                className="absolute text-[red] right-2 top-2 bg-red-100 hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
                size={40}
                // onClick={(event) => handleAddwishlist(event)}
              />
            ) : (
              <FiHeart
                className="absolute right-2 top-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-2.5 px-2.5  cursor-pointer"
                size={40}
                // onClick={(event) => handleAddwishlist(event)}
                onClick={onClickHeart}
              />
            )}

            <img
              src={activeImage.url}
              className="w-full rounded-md object-scale-down"
              alt=""
            />
          </div>
          <div className="flex flex-row gap-1">
            <SmallImagesContainer
              images={[
                productImages.productThumbnail,
                ...productImages.otherImages,
              ]}
              activeImage={activeImage}
              dispatch={dispatch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductImages;
