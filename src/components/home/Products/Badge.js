import React from "react";

const Badge = ({ text }) => {
  return (
    <div className="bg-[#FF4747] w-[40px] h-[20px] rounded-sm text-white flex justify-center items-center text-xs font-semibold hover:bg-[#000] duration-300 cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
