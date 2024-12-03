import React, { useEffect, useMemo, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import ShopProducts from "../../pages/Default/Shop/ShopProducts";
import Paginator from "../Paginator";
import axios from "axios";
import { Loader } from "../../dashboard/Components/Loader/LoadingSpin";
import { FlexProductPreview } from "../home/Products/flex-product-card";

export const ProductSection = ({
  productClassId,
  // category,
  // setIsSectionHasProduct,
}) => {
  const paginatorRef = useRef(null);
  async function fetchProducts(page, queryString) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?${queryString}&limit=50&page=${page}&fields=name,seller,createdAt,price,discountPercentage,productImages.productThumbnail.url`,
      );
      return response.data.data.products;
    } catch (error) {
      return [];
    }
  }

  //   console.log(" category", category);

  const { data, isFetching, isLoading, hasNextPage, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [`products`],
      queryFn: ({ pageParam = 1 }) =>
        fetchProducts(
          pageParam,
          `sort=name${productClassId ? `&productClass=${productClassId}` : ""}`,
          // `productClass=${productClassId}${
          //   category ? `&category=${category}` : ""
          // }`
        ),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
    });

  const products = useMemo(() => {
    return data?.pages.reduce((acc, page) => [...acc, ...page], []);
  }, [data]);

  // useEffect(() => {
  //   if ((products && products.length > 0) || category !== undefined) {
  //     setIsSectionHasProduct(true);
  //   } else {
  //     setIsSectionHasProduct(false);
  //   }
  // }, [products]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the target is visible
      },
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
    <div className="space-y-4">
      {(isLoading && (
        <div className="flex h-full w-full justify-center">
          <Loader />
        </div>
      )) || <ShopProducts products={products} hidetop={true} />}

      {error && <div>Error: {error.message}</div>}

      <div ref={paginatorRef}>
        <Paginator
          isFetching={isFetching}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
};

export const RelatedProducts = ({ productClassId }) => {
  const paginatorRef = useRef(null);
  async function fetchProducts(page, queryString) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/v1/products?${queryString}&limit=5&page=${page}&fields=name,seller,createdAt,price,discountPercentage,description,productImages.productThumbnail.url`,
      );
      return response.data.data.products;
    } catch (error) {
      return [];
    }
  }

  const { data, isFetching, isLoading, hasNextPage, error, fetchNextPage } =
    useInfiniteQuery({
      queryKey: [`products`],
      queryFn: ({ pageParam = 1 }) =>
        fetchProducts(
          pageParam,
          `sort=name${productClassId ? `&productClass=${productClassId}` : ""}`,
        ),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length + 1 : undefined,
    });

  const products = useMemo(() => {
    return data?.pages.reduce((acc, page) => [...acc, ...page], []);
  }, [data]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "0px",
        threshold: 1.0, // Trigger when 100% of the target is visible
      },
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
    <div className="space-y-4">
      {(isLoading && (
        <div className="flex h-full w-full justify-center">
          <Loader />
        </div>
      )) || (
        <div className="flex flex-wrap justify-center gap-4 sm:flex-col">
          {products.map((product) => (
            <div key={product.id} className=" ">
              <FlexProductPreview productInfo={product} />
            </div>
          ))}
        </div>
      )}

      {error && <div>Error: {error.message}</div>}

      <div ref={paginatorRef}>
        <Paginator
          isFetching={isFetching}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </div>
    </div>
  );
};
