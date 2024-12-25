import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { PiFireFill } from "react-icons/pi";
import { PiFireLight } from "react-icons/pi";
import { Loader } from "../dashboard/Components/Loader/LoadingSpin";
import ProductPreview from "./home/Products/Product";
import ProductsGridContainer from "./home/Products/ProductsGridContainer";

async function fetchPopularProducts() {
  try {
    const res = await axios(
      "https://e-commerce-bn-production.onrender.com/api/v1/products?seller=6683e958b88a1deb705f25a4&fields=name,createdAt,price,seller,discountPercentage,productImages.productThumbnail.url",
    );

    return res.data.data.products;
  } catch (error) {
    return [];
  }
}

function PopularProducts() {
  // Popular products are products that have been bought by many customers: Belong to feli express
  const { data: popularProducts, isLoading: isFetchingPopularProducts } =
    useQuery({
      queryKey: ["popularProducts"],
      queryFn: fetchPopularProducts,
    });

  return (
    <div className="mx-auto mt-10 max-w-container space-y-4 px-2 py-3 md:px-6">
      <div className="mb-8 flex flex-col items-center justify-center">
        <h2 className="flex items-center gap-1 text-center text-2xl font-bold uppercase text-primary">
          <PiFireFill className="h-8 w-8 font-extralight text-primary" />
          Popular products
        </h2>
        <hr class="my-5 h-px w-[10%] border-0 bg-primary" />
      </div>
      {isFetchingPopularProducts ? (
        <div className="text-center">
          <Loader />
        </div>
      ) : (
        popularProducts?.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {popularProducts?.map((product, index) => (
              <ProductPreview key={product.id + index} productInfo={product} />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default PopularProducts;
