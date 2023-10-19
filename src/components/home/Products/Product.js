import React from "react";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`product/${rootId}`, {
      state: {
        item: productItem,
      },
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
            imgSrc={props.img}
          />
        </div>
        <div className="absolute top-3 left-4">
          {props.badge && <Badge text={`- ${props.discountPercentage}%`} />}
        </div>
      </div>
      <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
        <div className="flex flex-col  font-titleFont">
          <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline">
            {props.productName}
          </h2>
          <div className="text-sm">
            <p className="text-[#1D6F2B] font-semibold">
              {props.badge ? props.discountedPrice : props.price} RWF
            </p>
            {props.badge && (
              <p className="text-[#00000080] line-through">{props.price} RWF</p>
            )}
          </div>
        </div>
        <div>
          <p className="text-[#1D6F2B] text-[14px]">{props.color}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
