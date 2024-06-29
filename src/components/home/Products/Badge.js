import React from "react";

const Badge = ({ text }) => {
  return (
    <div className=" w-[40px] h-[20px] rounded-sm text-primary flex justify-center text-center text-xs font-semibold cursor-pointer">
      {text}
    </div>
  );
};

export default Badge;
