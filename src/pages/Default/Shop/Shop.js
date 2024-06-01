import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PageLayout from "../../../components/designLayouts/PageLayout";
import { fetchCategories } from "../../../components/homePageCategories/HomePageCategories.js";
import ProductBanner from "../../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../../components/pageProps/shopPage/ShopSideNav";
import ShopProducts from "./ShopProducts.js";
import MobileCategoryNav from "../../../components/MobileCategoryNav.js";
import Paginator from "../../../components/Paginator.js";
import { Loader } from "../../../dashboard/Components/Loader/LoadingSpin.jsx";
import axios from "axios";
import { fetchProductclass } from "../../../dashboard/Redux/ReduxSlice/ProductClass.js";

export async function fetchProducts(page, queryString) {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?${queryString}&limit=10&page=${page}&fields=name,price,discountPercentage,productImages.productThumbnail.url`
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
    console.log("clicked", showfilter);
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

  return (
    <PageLayout showFooter={false}>
      <MobileCategoryNav title="Products Filters" categoryId={categoryId} />

      <div className="max-w-container mx-auto px-4 mt-5">
        {/* <Breadcrumbs title='Products' /> */}
        <div className="relative w-full h-full flex pb-20 gap-10">
          {/* <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav brands={category && category.brands} />
          </div> */}

          {showfilter && (
            <div className="w-[200px] lgl:w-[25%] bg-[white]  opacity-100    absolute mdl:relative mdl:hidden z-20 mdl:z-0 left-0 top-0  h-full">
              <ShopSideNav
                brands={category && category.brands}
                handlefilterShow={handlefilterShow}
              />
            </div>
          )}
          <div className="w-[200px] lgl:w-[25%] bg-[white]  hidden mdl:block z-10 mdl:z-0   h-full">
            <ShopSideNav brands={category && category.brands} />
          </div>
          <div className="w-full   mdl:w-[80%] lgl:w-[75%] h-full flex border  relative flex-col gap-10">
            <div className=" fixed z-50">
              {" "}
              <ProductBanner
                showfilter={showfilter}
                handlefilterShow={handlefilterShow}
              />
            </div>
            {(isLoading && (
              <div className="flex justify-center">
                <Loader fontSize={38} />
              </div>
            )) || (
              <ShopProducts
                products={products}
                productClass={productclass}
                category={category}
                subcategory={subcategory}
              />
            )}

            {error && <span>{error?.message}</span>}

            <Paginator
              isFetching={isFetching}
              isLoading={isLoading}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
