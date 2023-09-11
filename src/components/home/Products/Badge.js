import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#1D6F2B] w-[92px] h-[35px] text-white flex justify-center items-center text-base font-semibold hover:bg-[#000] duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
