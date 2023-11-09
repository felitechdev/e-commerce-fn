import React from "react";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate, useLocation } from "react-router-dom";

const Product = ({productInfo}) => {
  const rootId = productInfo._id;
  const navigate = useNavigate();
  const location = useLocation()

  const currentPathName = location.pathname
  
  const handleProductDetails = () => {
    navigate(`${currentPathName}product/${rootId}`, {
      state: {
        item: productInfo,
      },
      replace: true,
    });
  };
  return (
    <div
      className="w-full h-64 relative group border-2 border-gray-200 rounded-md cursor-pointer"
      onClick={handleProductDetails}
    >
      <div className="max-w-80 h-[70%] relative overflow-y-hidden ">
        <div>
          <Image
            className="w-full h-full rounded-tl-md rounded-tr-md"
            imgSrc={productInfo.productImages.productThumbnail.url}
          />
        </div>
        <div className="absolute top-3 left-4">
          {productInfo.discountPercentage > 0 && <Badge text={`- ${productInfo.discountPercentage}%`} />}
        </div>
      </div>
      <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
        <div className="flex flex-col  font-titleFont">
          <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline">
            {productInfo.name}
          </h2>
          <div className="text-sm">
            <p className="text-[#1D6F2B] font-semibold">
              {productInfo.discountPercentage > 0 ? productInfo.discountedPrice : productInfo.price} RWF
            </p>
            {productInfo.discountPercentage > 0 && (
              <p className="text-[#00000080] line-through">{productInfo.price} RWF</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
