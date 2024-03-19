import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Breadcrumbs from "../../../components/pageProps/Breadcrumbs";
import Pagination from "../../../components/pageProps/shopPage/Pagination";
import { FilterFilled } from "@ant-design/icons";
import ProductBanner from "../../../components/pageProps/shopPage/ProductBanner";
import ShopSideNav from "../../../components/pageProps/shopPage/ShopSideNav";
import PageLayout from "../../../components/designLayouts/PageLayout";
import ShopProducts from "./ShopProducts.js";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../../components/homePageCategories/HomePageCategories.js";
import { fetchProducts } from "./apis.js";
import { Loader } from "../../../dashboard/Components/Loader/LoadingSpin.jsx";
import MobileCategoryNav from "../../../components/MobileCategoryNav.js";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subcategory");
  const [showfilter, setShowFilter] = React.useState(false);

  const handlefilterShow = () => {
    setShowFilter(!showfilter);
  };

  const queryString = query && `?${query}`;

  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: [`products-${queryString}`],
    queryFn: () => fetchProducts(queryString),
    retry: false,
  });

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

  return (
    <PageLayout showFooter={true}>
      <MobileCategoryNav title="Categories" />
      <div className="max-w-container mx-auto px-4 mt-5">
        {/* <Breadcrumbs title='Products' /> */}
        <div className="relative w-full h-full flex pb-20 gap-10">
          {/* <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <ShopSideNav brands={category && category.brands} />
          </div> */}

          {showfilter && (
            <div className="w-[200px] lgl:w-[25%] bg-[white]  opacity-100    absolute mdl:relative mdl:hidden z-10 mdl:z-0 left-0 top-0  h-full">
              <ShopSideNav
                brands={category && category.brands}
                handlefilterShow={handlefilterShow}
              />
            </div>
          )}
          <div className="w-[200px] lgl:w-[25%] bg-[white]  hidden mdl:block z-10 mdl:z-0   h-full">
            <ShopSideNav brands={category && category.brands} />
          </div>
          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <ProductBanner handlefilterShow={handlefilterShow} />
            {(isLoading && (
              <div className="flex justify-center">
                <Loader fontSize={38} />
              </div>
            )) || (
              <ShopProducts
                products={products}
                category={category}
                subcategory={subcategory}
              />
            )}

            {error && <span>{error?.message}</span>}

            {/* <Pagination /> */}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Shop;
