import React from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/orebiSlice";

const Product = (props) => {
  const dispatch = useDispatch();
  const _id = props.productName;
  const idString = (_id) => {
    return String(_id).toLowerCase().split(" ").join("");
  };
  const rootId = idString(_id);

  const navigate = useNavigate();
  const productItem = props;
  const handleProductDetails = () => {
    navigate(`/product/${rootId}`, {
      state: {
        item: productItem,
      },
    });
  };
  return (
    <div className="w-full h-64 relative group border-2 border-gray-200 rounded-md">
      <div className="max-w-80 h-[70%] relative overflow-y-hidden ">
        <div>
          <Image className="w-full h-full rounded-tl-md rounded-tr-md" imgSrc={props.img} />
        </div>
        <div className="absolute top-3 left-4">
          {props.badge && <Badge text={`- ${props.discountPercentage}%`} />}
        </div>
        <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
          <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
            <li className="text-[#767676] hover:text-[#1D6F2B] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#1D6F2B] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Compare
              <span>
                <GiReturnArrow />
              </span>
            </li>
            <li
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: props._id,
                    name: props.productName,
                    quantity: 1,
                    image: props.img,
                    badge: props.badge,
                    price: props.price,
                    colors: props.color,
                  })
                )
              }
              className="text-[#767676] hover:text-[#1D6F2B] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#1D6F2B] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              Add to Cart
              <span>
                <FaShoppingCart />
              </span>
            </li>
            <li
              onClick={handleProductDetails}
              className="text-[#767676] hover:text-[#1D6F2B] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#1D6F2B] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full"
            >
              View Details
              <span className="text-lg">
                <MdOutlineLabelImportant />
              </span>
            </li>
            <li className="text-[#767676] hover:text-[#1D6F2B] text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-[#1D6F2B] flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
              Add to Wish List
              <span>
                <BsSuitHeartFill />
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
        <div className="flex flex-col  font-titleFont">
          <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden">
            {props.productName}
          </h2>
          <div className="text-sm">
            <p className="text-[#1D6F2B] font-semibold">{ props.badge ? props.discountedPrice : props.price } RWF</p> 
            { props.badge && <p className="text-[#00000080] line-through">{props.price} RWF</p> }
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
