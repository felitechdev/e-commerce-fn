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

const ProductBanner = ({
  itemsPerPageFromBanner,
  handlefilterShow,
  showfilter,
}) => {
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
      <div className="flex -mt-6 -ml-3 rounded-md p-1  border bg-[#1D6F2B]  items-center gap-4">
        {!showfilter && (
          <span className=" block mdl:hidden">
            {" "}
            {/* <MenuUnfoldOutlined
              className="text-[white] text-2xl  cursor-pointer "
              onClick={handlefilterShow}
            /> */}
            {/* <FilterFilled
            className="text-[green] text-2xl"
            onClick={handlefilterShow}
          />
         */}
          </span>
        )}
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
      <div className="hidden md:flex  items-center gap-2 md:gap-6 mt-2 md:-mt-7 relative   ">
        <div className="     flex  space-x-2 w-full  overflow-auto mdl:overflow-hidden ">
          {" "}
          <div className=" z-0 ">
            <ProductClassAccordion />
          </div>
          <div className="z-0">
            <ProductCategoryAccordion />
          </div>
          {categoryId && (
            <div className="z-0">
              <ProductSubCategoryAccordion />
            </div>
          )}
          <div className="z-0 ">
            <ProductBrandAccordion />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
