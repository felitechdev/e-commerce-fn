import React from "react";

import ProductsGridContainer from "../../../components/home/Products/ProductsGridContainer.js";
import ProductPreview from "../../../components/home/Products/Product.js";

export default function ShopProducts({
  products,
  category,
  subcategory,
  productClass,
  hidetop,
}) {
  return (
    <div className="p-2">
      {!hidetop && (
        <>
          <h2 className="m-2 font-semibold capitalize leading-tight text-[#1D6F2B]">
            {productClass?.name || ""} {`: ${category?.name || ""}`}{" "}
            {subcategory?.name ? `: ${subcategory.name}` : ""}
          </h2>
          <hr class="mb-8 mt-6 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
        </>
      )}

      <div>
        <ProductsGridContainer>
          {products &&
            products?.map((product, index) => (
              <ProductPreview key={product.id + index} productInfo={product} />
            ))}

          {products && (
            // products.map((product) => {
            //   const productThumbnail =
            //     product.productImages.productThumbnail.url.replace(
            //       product.productImages.productThumbnail.url.split("/")[6],
            //       "w_400,h_400"
            //     );
            //   return (
            //     <div className="w-full border rounded-xl overflow-hidden">
            //       <div className="w-full  overflow-hidden aspect-square mb-1 ">
            //         <img
            //           src={productThumbnail && productThumbnail}
            //           alt=""
            //           className="object-cover h-full w-full"
            //         />
            //       </div>

            //       <div className="flex justify-between items-center px-4 pb-2">
            //         <div>
            //           <h6 className="font-semibold capitalize">
            //             {product?.name}
            //           </h6>
            //           <p className="text-gray-500">{product?.price} RWF</p>
            //         </div>
            //         {/* <button className="bg-green-800 text-white p-2 inline-block rounded-xl text-base">
            //           Add to cat
            //         </button> */}
            //       </div>
            //     </div>
            //   );
            // })
            <></>
          )}
        </ProductsGridContainer>
      </div>
    </div>
  );
}
