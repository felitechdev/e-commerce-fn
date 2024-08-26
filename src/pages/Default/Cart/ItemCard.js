import React from "react";

import { FiTrash2 } from "react-icons/fi";

const ItemCard = ({
  itemInfo,
  handleAddCart,
  handleRemoveCart,
  handleRemoveitemfromCart,
}) => {
  return (
    <div className="w-full  flex flex-wrap justify-between pr-4 mb-4 border py-2  rounded-lg">
      <div className="flex  col-span-5  mdl:col-span-2  ml-4 ">
        <img
          className=" w-1/2 md:w-32  h-32"
          src={itemInfo.productThumbnail.url}
          alt="productImage"
        />
        <div className="w-32 flex flex-col gap-2  p-2">
          <h1 className="   text-gray-700">{itemInfo.name}</h1>

          {itemInfo?.variations?.color && (
            <h2 className="text-sm">
              <span className="bg-[#1D6F2B]  text-white font-base me-2 px-2.5 py-0.5 rounded">
                Color:
              </span>
              <span className="font-bold text-gray-600 capitalize">
                {itemInfo.variations.color}
              </span>
            </h2>
          )}
          {itemInfo?.variations?.size && (
            <h2 className="text-sm">
              <span className="bg-[#1D6F2B]  text-white  font-base me-2 px-2.5 py-0.5 rounded">
                Size:
              </span>
              <span className="border-[2px] rounded-lg py-1 px-2 cursor-pointer text-sm">
                {itemInfo.variations.size}
              </span>
            </h2>
          )}
        </div>
      </div>
      <div className="  flex items-center col-span-5  w-auto justify-between py-4 mdl:py-0 px-2 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex  items-center ">{itemInfo.price} RWF</div>
        <div className="w-1/3 flex items-center gap-0 text-md ">
          <span
            onClick={(event) => handleRemoveCart(event, itemInfo.id)}
            className="w-6 h-6 text-[red] font-semibold bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p className="border px-2 h-6 ">{itemInfo.items}</p>
          <span
            onClick={(event) => handleAddCart(event, itemInfo.id)}
            className="w-6 h-6 text-primary font-semibold bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>

          <span
            className="ml-2 text-[red] hover:bg-[#E5E5E5] hover:rounded-full py-1.5 px-1.5 "
            onClick={() => handleRemoveitemfromCart(itemInfo.id)}
          >
            <FiTrash2 />
          </span>
        </div>
        <div className=" flex flex-col font-titleFont">
          <p className="items-center  font-semibold text-">
            {itemInfo.price * itemInfo.items} RWF
          </p>
          <p className="text-xs">
            {/* {itemInfo.deliveryFee > 0
              ? `Includes delivery fee of ${itemInfo.deliveryFee} RWF `
              : "Free delivery"} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ItemCardCheckout = ({ itemInfo }) => {
  return (
    <div className="w-full flex justify-around  mb-4 h-fit border py-2 px-2 rounded-lg">
      <div className=" grid grid-cols-2  text-sm ml-0 ">
        <div className=" w-[120px]  h-[140px]">
          <img
            className=" w-32  h-32 object-center "
            src={itemInfo.productThumbnail.url}
            alt="productImage"
          />
        </div>
        <div className="w-32 flex flex-col gap-2">
          <h1 className=" mt-2 text-gray-700">{itemInfo.name}</h1>

          {itemInfo?.variations?.color && (
            <p className="  text-gray-700">
              color: {itemInfo?.variations?.color}{" "}
            </p>
          )}
          {itemInfo?.variations?.size && (
            <p className=" text-gray-700">
              Size: {itemInfo?.variations?.size}{" "}
            </p>
          )}
          <p className=" text-gray-700">Qty: {itemInfo.items} </p>
          <p className=" md:hidden pb-0 mb-5   font-semibold ">
            {itemInfo.price * itemInfo.items} RWF
          </p>
        </div>
      </div>

      <div className=" hidden  md:flex  pb-0  items-start flex-col justify-center">
        <p className="pb-0 mb-5  font-semibold ">
          {itemInfo.price * itemInfo.items} RWF
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
