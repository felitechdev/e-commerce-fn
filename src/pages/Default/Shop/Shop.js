import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PageLayout from "../../../components/designLayouts/PageLayout";
import { fetchCategories } from "../../../components/homePageCategories/HomePageCategories.js";
import ProductBanner from "../../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../../components/pageProps/shopPage/ShopSideNav";
import ShopProducts from "./ShopProducts.js";
import { CloseSquareFilled } from "@ant-design/icons";
import MobileCategoryNav from "../../../components/MobileCategoryNav.js";
import Paginator from "../../../components/Paginator.js";
import { Loader } from "../../../dashboard/Components/Loader/LoadingSpin.jsx";
import axios from "axios";
import { fetchProductclass } from "../../../dashboard/Redux/ReduxSlice/ProductClass.js";

export async function fetchProducts(page, queryString) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?${queryString}&limit=10&page=${page}&fields=name,colorMeasurementVariations,seller,price,discountPercentage,productImages.productThumbnail.url`
    );

    return response.data.data.products;
  } catch (error) {
    return [];
  }
}


const Shop = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subCategory");
  const productclassId = searchParams.get("productClass");
  const [showfilter, setShowFilter] = React.useState(false);
  const dispatch = useDispatch();
  const queryString = query && `${query}`;

  const paginatorRef = useRef(null);

  const {
    loading: productclassLoading,
    productclass: productclassData,
    errorMessage: productclassError,
  } = useSelector((state) => state.productclass);

  useEffect(() => {
    dispatch(fetchProductclass());
  }, [dispatch]);

  const { data, isFetching, isLoading, hasNextPage, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [`products-${queryString}`],
      queryFn: ({ pageParam = 1 }) => {
        return fetchProducts(pageParam, queryString);
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

  const handlefilterShow = () => {
    setShowFilter(!showfilter);
  };

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const category =
    categoryId && categories
      ? categories.find((cat) => cat.id === categoryId)
      : null;

  const subcategory =
    subcategoryId && category
      ? category.subCategories.find((subCat) => subCat.id === subcategoryId)
      : null;

  const productclass =
    productclassId && productclassData
      ? productclassData.find(
          (productclass) => productclass.id === productclassId
        )
      : null;

  useEffect(() => {
    // Toggle body scroll when the sidebar is shown/hidden
    if (showfilter) {
      document.body.classList.add("no-scroll");
    } else {
      // document.body.classList.remove("no-scroll");
      document.body.classList.add("no-scroll");
    }


    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showfilter]);


  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
        }
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );
  
    if (paginatorRef.current) {
      observer.observe(paginatorRef.current);
    }
  
    return () => {
      if (paginatorRef.current) {
        observer.unobserve(paginatorRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage]);
  
  


  return (
    <PageLayout showFooter={false}>
      <div className="max-w-container mx-auto px-4 mdl:-mt-5">
        <div className="relative w-full overflow-hidden scrollbar-none h-[90vh] flex pb-0 gap-2">
        {showfilter && (
  <div
    className="w-[300px] border -mt-5 lgl:w-[25%] bg-[white] fixed mdl:relative mdl:hidden z-20 mdl:z-0 left-0 overflow-y-auto pb-10 h-[90vh]"
    onMouseOver={(e) => e.stopPropagation()}
  >
    <CloseSquareFilled
      onClick={handlefilterShow}
      className="text-primary fixed z-50 mdl:hidden text-4xl cursor-pointer left-[300px]"
    />
    <ShopSideNav
      brands={category && category.brands}
      handlefilterShow={handlefilterShow}
    />
  </div>
)}

          <div className="fixed pb-20 flex-1 overflow-auto border bg-white w-[200px] hidden mdl:block mdl:w-1/4 max-w-[360px] z-10 mdl:z-0 h-full">
            <ShopSideNav brands={category && category.brands} />
          </div>

          <div className="w-full mdl:ml-[26%] flex-auto overflow-auto  scrollbar-hide h-full flex mdl:border relative flex-col gap-5">
            <div className="fixed z-10 bg-black">
              <ProductBanner
                showfilter={showfilter}
                handlefilterShow={handlefilterShow}
              />
            </div>
            {isLoading ? (
              <div className="flex justify-center">
                <Loader fontSize={38} />
              </div>
            ) : (
              <ShopProducts 
                products={products}
                productClass={productclass}
                category={category}
                subcategory={subcategory}
              />
            )}

            {error && <span>{error?.message}</span>}

            <div ref={paginatorRef}  >
      <Paginator
        isFetching={isFetching}
        isLoading={isLoading} 
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
      </div>
         
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;


