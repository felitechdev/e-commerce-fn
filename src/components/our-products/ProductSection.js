import React, { useEffect, useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ShopProducts from "../../pages/Default/Shop/ShopProducts";
import Paginator from "../Paginator";
import axios from "axios";
import { Loader } from "../../dashboard/Components/Loader/LoadingSpin";

export const ProductSection = ({
  productClassId,
  category,
  setIsSectionHasProduct,
}) => {
  async function fetchProducts(page, queryString) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?${queryString}&limit=12&page=${page}&fields=name,seller,createdAt,price,discountPercentage,productImages.productThumbnail.url`
      );
      return response.data.data.products;
    } catch (error) {
      return [];
    }
  }

  //   console.log(" category", category);

  const { data, isFetching, isLoading, hasNextPage, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [`products-${productClassId}-${category}`],
      queryFn: ({ pageParam = 1 }) =>
        fetchProducts(
          pageParam,
          `productClass=${productClassId}${
            category ? `&category=${category}` : ""
          }`
        ),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
    });

  const products = useMemo(() => {
    return data?.pages.reduce((acc, page) => [...acc, ...page], []);
  }, [data]);

  useEffect(() => {
    if ((products && products.length > 0) || category !== undefined) {
      setIsSectionHasProduct(true);
    } else {
      setIsSectionHasProduct(false);
    }
  }, [products]);

  return (
    <div className="space-y-4">
      {(isLoading && (
        <div className="flex h-full w-full justify-center">
          <Loader />
        </div>
      )) || <ShopProducts products={products} hidetop={true} />}

      {error && <div>Error: {error.message}</div>}

      <Paginator
        isFetching={isFetching}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  );
};
