import React, { useMemo, useRef } from "react";
import Banner from "./Banner/Banner";
import AllProducts from "./home/AllProducts/AllProducts";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

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
import { useFetchfeaturedproduct } from "../APIs/react-query/featured-product";
import { CategoryImagesCards } from "./category-images-cards/category";
import ProductDisplay from "./our-products/ourproduct-display";
import ProductPreview from "./home/Products/Product";
export async function fetchProducts(page) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?limit=20&page=${page}&fields=name,price,seller,discountPercentage,colorMeasurementVariations,hasColors,hasMeasurements,productImages.productThumbnail.url`
    );

    return response.data.data.products;
  } catch (error) {
    return [];
  }
}

function ProductsCategories() {
  const { data, isFetching, isLoading, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["Arrivarls"],
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

  const { data: featuredproducts, isLoading: isloading } =
    useFetchfeaturedproduct();

  const ads = featuredproducts?.data?.products.map((product) => {
    return {
      title: product.name,
      id: product.id,
      image: product.productImages.productThumbnail.url,
    };
  });

  // console.log("featuredproducts", ads, featuredproducts);

  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full mx-auto ">
      <Banner ads={ads} loading={isloading} />

      <div className="max-w-container mx-auto px-2 md:px-6 space-y-4 mt-10 ">
        <h1 className=" medium_text">Categories</h1>
        <CategoryImagesCards />
      </div>

      <div className=" max-w-container mx-auto px-2 md:px-6 space-y-4 my-10">
        <h1 className="medium_text">New Arrivals</h1>
        <div className="relative bg-[#f8f8f8] rounded-md p-4 h-72 ">
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg z-10"
          >
            <BsArrowLeft />
          </button>
          <div
            className="flex gap-4 overflow-hidden no-scrollbar items-center justify-center text-center"
            ref={containerRef}
          >
            {isLoading ? (
              <div className=" w-full h-[100%] m-auto  flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              products?.map((product, index) => (
                <div className="min-w-[200px] mb-3 max-w-[250px] h-68 ">
                  <ProductPreview
                    key={product.id + index}
                    productInfo={product}
                  />
                </div>
              ))
            )}
          </div>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full shadow-lg z-10"
          >
            <BsArrowRight />
          </button>
        </div>
      </div>
      <div className="max-w-container mx-auto px-1 md:px-6 space-y-4 mt-10 ">
        <h1 className=" medium_text m-6 ">Our Products</h1>
        <ProductDisplay />
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
          className="flex items-center gap-3 p-2 rounded-t   bg-[red] cursor-pointer"
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
                <ProductCategoryAccordion ismobile={true} />
              </div>
              {categoryId && (
                <div className="z-0">
                  <ProductSubCategoryAccordion ismobile={true} />
                </div>
              )}
              <div className="z-0 ">
                <ProductBrandAccordion ismobile={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
