import React, { useEffect, useState } from "react";
import { BsGridFill } from "react-icons/bs";
import { ImList } from "react-icons/im";
import { GoTriangleDown } from "react-icons/go";
import { FilterFilled } from "@ant-design/icons";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseSquareFilled,
  FastBackwardOutlined,
} from "@ant-design/icons";
import ProductClassAccordion from "./Accordions/ProductClass";
import ProductCategoryAccordion from "./Accordions/productCategory";
import ProductBrandAccordion from "./Accordions/productBrand";
import ProductSubCategoryAccordion from "./Accordions/ProductSubCategory";
import { useSearchParams } from "react-router-dom";

const ProductBanner = ({ itemsPerPageFromBanner, handlefilterShow }) => {
  const [girdViewActive, setGridViewActive] = useState(true);
  const [listViewActive, setListViewActive] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [subcategories, setSubcategories] = useState();
  const categoryId = searchParams.get("category");

  // useEffect(() => {
  //   const gridView = document.querySelector(".gridView");
  //   const listView = document.querySelector(".listView");

  //   gridView.addEventListener("click", () => {
  //     setListViewActive(false);
  //     setGridViewActive(true);
  //   });
  //   listView.addEventListener("click", () => {
  //     setGridViewActive(false);
  //     setListViewActive(true);
  //   });
  // }, [girdViewActive, listViewActive]);

  return (
    <div className="w-full  flex flex-col md:flex-row md:items-center justify-between">
      <div className="flex items-center gap-4">
        <span className=" block mdl:hidden">
          {" "}
          <MenuUnfoldOutlined
            className="text-[green] text-4xl cursor-pointer "
            onClick={handlefilterShow}
          />
          {/* <FilterFilled
            className="text-[green] text-2xl"
            onClick={handlefilterShow}
          />
         */}
        </span>
        {/* <span
          className={`${
            girdViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-lg flex items-center justify-center cursor-pointer gridView`}
        >
          <BsGridFill />
        </span> */}
        {/* <span
          className={`${
            listViewActive
              ? "bg-primeColor text-white"
              : "border-[1px] border-gray-300 text-[#737373]"
          } w-8 h-8 text-base flex items-center justify-center cursor-pointer listView`}
        >
          <ImList />
        </span> */}
      </div>
      <div className="flex items-center gap-2 md:gap-6 mt-4 md:mt-0 relative  ">
        <div className="  top-0   flex  space-x-2 w-full  overflow-auto mdl:overflow-hidden ">
          {" "}
          <div className=" z-10 ">
            <ProductClassAccordion />
          </div>
          <div className="z-50">
            <ProductCategoryAccordion />
          </div>
          {categoryId && (
            <div className="z-10">
              <ProductSubCategoryAccordion />
            </div>
          )}
          <div className="z-50 ">
            <ProductBrandAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
