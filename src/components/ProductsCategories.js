import React, { useMemo } from "react";
import Banner from "./Banner/Banner";
import AllProducts from "./home/AllProducts/AllProducts";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";

// import MobileCategoryNav from "./MobileCategoryNav";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Paginator from "./Paginator";
import ProductClassAccordion from "./pageProps/shopPage/Accordions/ProductClass";
import ProductCategoryAccordion from "./pageProps/shopPage/Accordions/productCategory";
import ProductSubCategoryAccordion from "./pageProps/shopPage/Accordions/ProductSubCategory";
import ProductBrandAccordion from "./pageProps/shopPage/Accordions/productBrand";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import MenuIconWhite from "../assets/images/menu-white.png";
export async function fetchProducts(page) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?limit=10&page=${page}&fields=name,price,discountPercentage,productImages.productThumbnail.url`
    );

    return response.data.data.products;
  } catch (error) {
    return [];
  }
}

function ProductsCategories() {
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["products"],
      queryFn: ({ pageParam = 1 }) => {
        return fetchProducts(pageParam);
      },
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    });

  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const categoryId = searchParams.get("category");

  const products = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <div className="w-full mx-auto ">
      <MobileCategoryNav title="Shop by Categories" categoryId={categoryId} />
      <Banner />

      <div className="max-w-container mx-auto px-4">
        {isLoading && (
          <div className="flex justify-center p-16">
            <Loader />
          </div>
        )}

        {products && <AllProducts products={products} />}

        <Paginator
          isFetching={isFetching}
          isLoading={isLoading}
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
        />
      </div>
    </div>
  );
}

export default ProductsCategories;

export const MobileCategoryNav = ({ title, categoryId }) => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);

  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const subcategoryId = searchParams.get("subCategory");
  const productclassId = searchParams.get("productClass");

  const handleClick = (cat) => {
    setActiveCategory(cat);
  };

  const handleShowCategories = () => {
    setShowCategories((curr) => !curr);
  };
  return (
    <>
      <div className="md:hidden px-4 fixed top-32 right-0 z-20  sm:left-0 w-[100%] py-4">
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
                <ProductClassAccordion ismobile={true} />
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
      </div>
    </>
  );
};
