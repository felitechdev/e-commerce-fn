import React, { useState } from "react";
import Brand from "./shopBy/Brand";
import Category from "./shopBy/Category";
import { motion } from "framer-motion";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CloseSquareFilled,
  FastBackwardOutlined,
} from "@ant-design/icons";
import Color from "./shopBy/Color";
import Price from "./shopBy/Price";
import { useSearchParams } from "react-router-dom";
import ProductClassAccordion from "./Accordions/ProductClass";
import ProductCategoryAccordion from "./Accordions/productCategory";
import ProductSubCategoryAccordion from "./Accordions/ProductSubCategory";
import ProductBrandAccordion from "./Accordions/productBrand";

const ShopSideNav = ({ brands, handlefilterShow }) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const categoryId = searchParams.get("category");
  const [category, setCategory] = useState(false);
  return (
    <div
      className="w-full px-6 py-4 flex flex-col gap-6 relative  z-30   bg-white   "
      onMouseMove={(e) => {
        e.stopPropagation();
      }}
      onMouseOver={(e) => {
        e.stopPropagation();
      }}
      onMouseEnter={(e) => {
        e.stopPropagation();
      }}
    >
      {/* <CloseSquareFilled
        onClick={handlefilterShow}
        className="text-primary fixed z-50  mdl:hidden text-4xl  cursor-pointer -right-5 "
      /> */}
      <Price handlefilterShow={() => handlefilterShow()} />

      <div
        className={`mt-4 !m-0  overflow-auto`}
        onMouseMove={(e) => {
          e.stopPropagation();
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
        }}
        onMouseEnter={(e) => {
          e.stopPropagation();
        }}
      >
        <h1
          onClick={() => setCategory(!category)}
          className="flex justify-between  p-1 rounded-md text-base font-semibold cursor-pointer items-center font-titleFont mb-2"
        >
          Shop by Categories & Brands
          <span className="text-lg">{category ? "-" : "+"}</span>
        </h1>
        {category && (
          <motion.ul
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-sm flex flex-col gap-1"
          >
            <div className="flex-col w-full space-y-2  overflow-auto mdl:overflow-hidden ">
              {" "}
              <div className=" z-0 ">
                <ProductClassAccordion ismobile={false} />
              </div>
              <div className="z-0">
                <ProductCategoryAccordion ismobile={false} />
              </div>
              {categoryId && (
                <div className="z-0">
                  <ProductSubCategoryAccordion ismobile={false} />
                </div>
              )}
              <div className="z-0 ">
                <ProductBrandAccordion ismobile={false} />
              </div>
            </div>
          </motion.ul>
        )}
      </div>
      <Brand brands={brands} handlefilterShow={() => handlefilterShow()} />
      {/* <Category icons={true} /> */}
      <Color />
    </div>
  );
};

export default ShopSideNav;
