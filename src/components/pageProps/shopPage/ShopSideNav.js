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
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryId = searchParams.get("productClass");
  const [category, setCategory] = useState(false);
  const [brandOfProductClass, setBrandOfProductClass] = useState([]);

  const handleClearFilter = () => {
    searchParams.delete("productClass");
    setSearchParams();
  };

  return (
    <div
      className="relative z-30 flex w-full flex-col gap-6 bg-white px-6 py-4"
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
        className={`!m-0 mt-4 overflow-auto`}
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
          className="font-titleFont mb-2 flex cursor-pointer items-center justify-between rounded-md p-1 text-base font-semibold"
        >
          Shop by Categories & Brands
          <span className="text-xl">{category ? "-" : "+"}</span>
        </h1>
        {categoryId !== null && (
          <span
            className={`my-2 flex w-[50%] cursor-pointer items-center gap-2 rounded-md border-b-[1px] border-b-[#F0F0F0] bg-[#d43f3f] p-2 pb-2 text-center capitalize !text-white duration-300 hover:border-gray-400`}
            onClick={handleClearFilter}
          >
            clear filter
          </span>
        )}
        {category && (
          <motion.ul
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-1 text-sm"
          >
            <div className="w-full flex-col space-y-2 overflow-auto mdl:overflow-hidden">
              {" "}
              <div className="z-0">
                <ProductClassAccordion
                  ismobile={false}
                  setBrandOfProductClass={setBrandOfProductClass}
                />
              </div>
              {/* <div className="z-0">
                <ProductCategoryAccordion ismobile={false} />
              </div>
              {categoryId && (
                <div className="z-0">
                  <ProductSubCategoryAccordion ismobile={false} />
                </div>
              )}
              <div className="z-0 ">
                <ProductBrandAccordion ismobile={false} />
              </div> */}
            </div>
          </motion.ul>
        )}
      </div>
      {brandOfProductClass.length > 0 && (
        <Brand
          brands={brandOfProductClass}
          handlefilterShow={() => handlefilterShow()}
        />
      )}
      {/* <Category icons={true} /> */}
      <Color />
    </div>
  );
};

export default ShopSideNav;
