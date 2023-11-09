import React from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-black bg-[#000000] bg-opacity-10 hover:bg-opacity-20 hover:text-[#1D6F2B]  duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] left-2"
      onClick={onClick}
    >
      <span>
        <FaLongArrowAltLeft />
      </span>
    </div>
  );
};

export default SamplePrevArrow;
