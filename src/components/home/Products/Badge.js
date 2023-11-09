import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#1D6F2B] w-[40px] h-[20px] rounded-sm text-white flex justify-center text-center text-xs font-semibold cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
