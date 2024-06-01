import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MenuIconWhite from "../assets/images/menu-white.png";
import { fetchCategories } from "./homePageCategories/HomePageCategories";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";
import { Link } from "react-router-dom";
import ProductClassAccordion from "./pageProps/shopPage/Accordions/ProductClass";
import ProductCategoryAccordion from "./pageProps/shopPage/Accordions/productCategory";
import ProductSubCategoryAccordion from "./pageProps/shopPage/Accordions/ProductSubCategory";
import ProductBrandAccordion from "./pageProps/shopPage/Accordions/productBrand";

export default function MobileCategoryNav({ title, categoryId }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const { isLoading, data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const handleClick = (cat) => {
    setActiveCategory(cat);
  };

  const handleShowCategories = () => {
    setShowCategories((curr) => !curr);
  };

  return (
    <div className="md:hidden px-4 fixed top-32 right-0 z-20  sm:left-10 w-[90%] py-4">
      {/* <div className="md:hidden px-4 "> */}
      <div
        className="flex items-center gap-3 p-2 rounded-t   bg-[#1D6F2B] cursor-pointer"
        onClick={handleShowCategories}
      >
        <img src={MenuIconWhite} className="w-5 h-5" />
        <h3 className=" text-white text-lg">{title}</h3>
      </div>
      {showCategories && (
        <>
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
        </>
      )}

      {/* {showCategories && (
        <>
          {isLoading && (
            <div className="flex justify-center p-16">
              <Loader />
            </div>
          )}

          {!isLoading && (
            <div className="flex flex-wrap max-h-48 gap-2 rounded pt-2 justify-evenly items-start overflow-auto ">
              {categories.map((cat) => (
                <button
                  onClick={() => handleClick(cat)}
                  className={`p-2 border-none  capitalize rounded-full ${
                    activeCategory?.name === cat?.name
                      ? "bg-[#1D6F2B] text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat?.name}
                </button>
              ))}
            </div>
          )}

          <hr class="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />

          {activeCategory && (
            <div className="flex flex-wrap gap-1 min-h-full rounded">
              {categories
                .find((cat) => {
                  return cat?.id === activeCategory?.id;
                })
                .subCategories.map((subCat) => (
                  <Link
                    to={`/shop/?category=${activeCategory?.id}&subcategory=${subCat?.id}`}
                    className="capitalize py-1 px-2  rounded-full bg-slate-700 text-white hover:text-underline"
                  >
                    {subCat.name}
                  </Link>
                ))}
            </div>
          )}
        </>
      )} */}
    </div>
  );
}
