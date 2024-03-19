import React from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";
import { FilterFilled } from "@ant-design/icons";

const ShopSideNav = ({ brands, handlefilterShow }) => {
  return (
    <div className="w-full px-6 flex flex-col gap-6 border z-30  ">
      <span className=" mdl:hidden mt-5 w-full flex  justify-between  ">
        {" "}
        <h1></h1>
        <FilterFilled
          className="text-[green] text-xl"
          onClick={handlefilterShow}
        />
      </span>
      <Price />
      <Brand brands={brands} />
      {/* <Category icons={true} /> */}
      <Color />
    </div>
  );
};

export default ShopSideNav;
