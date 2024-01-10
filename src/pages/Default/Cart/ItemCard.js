import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { deleteCartItem, updateCartItem } from "../../../redux/userSlice";

import { FiTrash2 } from "react-icons/fi";

const ItemCard = ({
  itemInfo,
  userInfo,
  userCart,
  handleAddCart,
  handleRemoveCart,
}) => {
  const dispatch = useDispatch();

  console.log("item", itemInfo);

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2 rounded-lg">
      <div className="flex-col col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        {/* <ImCross
          // onClick={() => removeCartItem(itemInfo._id)}
          className="text-[#1D6F2B] hover:text-red-500 duration-300 cursor-pointer"
        /> */}
        <img
          className="w-32 h-32"
          src={itemInfo.productThumbnail.url}
          alt="productImage"
        />
        <div>
          <h1 className="font-titleFont font-semibold mt-2">{itemInfo.name}</h1>
          {/* <h2 className="text-sm">Color: {itemInfo.selectedProductColor}</h2>
          <h2 className="text-sm">Size: {itemInfo.size}</h2> */}
        </div>
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {itemInfo.price} RWF
        </div>
        <div className="w-1/3 flex items-center gap-0 text-lg ">
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

          <span className="ml-2 text-[red]">
            <FiTrash2 />
          </span>
        </div>
        <div className="w-1/3 flex flex-col font-titleFont">
          <p className="items-center font-bold text-lg">
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

export default ItemCard;
