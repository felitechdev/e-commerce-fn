import React, { useEffect, useMemo, useRef, useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import Banner from "./Banner/Banner";

import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";

// import MobileCategoryNav from "./MobileCategoryNav";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { useFetchfeaturedproduct } from "../APIs/react-query/featured-product";
import MenuIconWhite from "../assets/images/menu-white.png";
import PopularProducts from "./PopularProducts";
import { CategoryImagesCards } from "./category-images-cards/category";
import ProductPreview from "./home/Products/Product";
import ProductDisplay from "./our-products/ourproduct-display";
import ProductClassAccordion from "./pageProps/shopPage/Accordions/ProductClass";
import ProductSubCategoryAccordion from "./pageProps/shopPage/Accordions/ProductSubCategory";
import ProductBrandAccordion from "./pageProps/shopPage/Accordions/productBrand";
import ProductCategoryAccordion from "./pageProps/shopPage/Accordions/productCategory";

// export const async fetchPopularProducts(){
//   try {
//     const response = await axios.get(
//       `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?fields=name,createdAt,price,seller,discountPercentage,colorMeasurementVariations,hasColors,hasMeasurements,productImages.productThumbnail.url&createdAt[gte]=${prevTwodayago}&createdAt[lte]=${tomorrow}`,
//       // `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?fields=name,createdAt,price,seller,discountPercentage,colorMeasurementVariations,hasColors,hasMeasurements,productImages.productThumbnail.url`
//     );

//     return response.data.data.products;
//   } catch (error) {
//     return [];
//   }
// }

export async function fetchProducts(page) {
  let today = format(new Date().getDate(), "yyyy-MM-dd");
  let tomorrow = format(
    new Date().setDate(new Date().getDate() + 1),
    "yyyy-MM-dd",
  );

  let prevTwodayago = format(
    new Date().setDate(new Date().getDate() - 3),
    "yyyy-MM-dd",
  );

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?fields=name,createdAt,price,seller,discountPercentage,colorMeasurementVariations,hasColors,hasMeasurements,productImages.productThumbnail.url&createdAt[gte]=${prevTwodayago}&createdAt[lte]=${tomorrow}`,
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
      image: product.featured.image,
    };
  });

  const [isLeftDisabled, setIsLeftDisabled] = useState(true); // Left button disabled state
  const [isRightDisabled, setIsRightDisabled] = useState(false); // Right button disabled state

  const containerRef = useRef(null);

  const scrollLeft = () => {
    containerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const checkScrollPosition = () => {
    const container = containerRef.current;

    if (container) {
      // Round the scrollLeft and maxScrollLeft values to prevent rounding issues
      const scrollLeft = Math.ceil(container.scrollLeft);
      const maxScrollLeft = Math.floor(
        container.scrollWidth - container.clientWidth,
      );

      // Set disabled states
      setIsLeftDisabled(scrollLeft === 0);
      setIsRightDisabled(scrollLeft >= maxScrollLeft);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition(); // Trigger the check on mount

      return () => {
        container.removeEventListener("scroll", checkScrollPosition);
      };
    }
  }, [products]); // Run when products change or component mounts

  // Add an effect to recheck scroll position after images/products load
  useEffect(() => {
    checkScrollPosition(); // Run again once products have been loaded
  }, [products]); // Trigger when products data changes

  return (
    <div className="mx-auto w-full">
      <div className="mb-12">
        <Banner ads={ads} loading={isloading} />
      </div>

      <div className="mx-auto max-w-container space-y-4 px-2 py-3 md:px-6">
        <div className="mb-2 flex flex-col items-center justify-center">
          <h2 className="flex items-center gap-1 text-center text-2xl font-bold uppercase text-primary">
            <BiSolidCategory className="h-8 w-8 font-extralight text-primary" />
            Shop By Category
          </h2>
          <hr class="my-5 h-px w-[10%] border-0 bg-primary" />
          <CategoryImagesCards />
        </div>
      </div>

      <PopularProducts />

      {isLoading && (
        <div className="m-auto flex h-[100%] w-full items-center justify-center">
          <Loader />
        </div>
      )}

      {products && products.length > 0 && (
        <div className="mx-auto my-10 max-w-container space-y-4 px-2 md:px-6">
          <h1 className="text-2xl font-bold capitalize">New Arrivals</h1>
          <div className="relative h-fit rounded-md">
            <button
              onClick={scrollLeft}
              disabled={isLeftDisabled}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary p-2 text-white shadow-lg disabled:opacity-50"
            >
              <BsArrowLeft />
            </button>
            <div
              className="no-scrollbar flex items-center gap-4 overflow-hidden text-center"
              ref={containerRef}
            >
              {isLoading ? (
                <div className="m-auto flex h-[100%] w-full items-center justify-center">
                  <Loader />
                </div>
              ) : (
                products?.map((product, index) => (
                  <div className="relative min-w-[200px] max-w-[250px]">
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
              disabled={isRightDisabled}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-primary p-2 text-white shadow-lg disabled:opacity-50"
            >
              <BsArrowRight />
            </button>
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 flex max-w-container flex-col gap-2 px-2 md:px-6">
        <div className="mb-2 flex flex-col items-center justify-center">
          <h2 className="flex items-center gap-1 text-center text-2xl font-bold uppercase text-primary">
            <HiOutlineLightBulb className="h-8 w-8 font-extralight text-primary" />
            Discover More
          </h2>
          <hr class="my-5 h-px w-[10%] border-0 bg-primary" />
        </div>
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
      <div className="fixed right-0 top-32 z-20 w-[100%] px-4 py-4 sm:left-0 md:hidden">
        {/* <div className="md:hidden px-4 "> */}
        <div
          className="flex cursor-pointer items-center gap-3 rounded-t bg-[#1D6F2B] p-2"
          onClick={handleShowCategories}
        >
          <img src={MenuIconWhite} className="h-5 w-5" />
          <h3 className="text-lg text-white">{title}</h3>
        </div>
        {showCategories && (
          <>
            <div className="flex w-full space-x-2 overflow-auto mdl:overflow-hidden">
              {" "}
              <div className="z-0">
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
              <div className="z-0">
                <ProductBrandAccordion ismobile={true} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
