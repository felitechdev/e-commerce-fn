import React, { useState, useEffect, useRef } from "react";
import ProductImages from "./ProductImages";
import ProductMainInfo from "./ProductMainInfo";
import CheckoutDetails from "./CheckoutDetails";
import ProductSecondaryInfo from "./ProductSecondaryInfo";
import { useDispatch } from "react-redux";
import { addTowishlist } from "../../redux/Reducers/wishlist";
import { removeTowishlist } from "../../redux/Reducers/wishlist";
import discountedFinalPrice from "../../util/discountedFinalPrice";
import {
  ProductSection,
  RelatedProducts,
} from "../../components/our-products/ProductSection";
export default function ProductDetails({ product, dispatch }) {
  const [sectionHasProducts, setSectionHasProducts] = useState({});

  const topDivRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 2000);
  };

  window.addEventListener("scroll", toggleVisible);
  const handleAddwishlist = async (id) => {
    // event.stopPropagation();

    let productInfo = product.productDetails;

    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (!wishlist) {
      wishlist = [];
    }
    let existingProduct = wishlist.find((product) => product.id === id);

    if (!existingProduct) {
      existingProduct = {
        id: productInfo.id,
        name: productInfo.name,
        price: Math.trunc(
          await discountedFinalPrice(
            productInfo.price,
            productInfo.discountPercentage,
          ),
        ),
        productThumbnail: productInfo.productImages.productThumbnail,
        seller: productInfo.seller,
        discountPercentage: productInfo?.discountPercentage,
        items: 1,
        hasColors: productInfo.hasColors,
        hasMeasurements: productInfo.hasMeasurements,
      };
      wishlist.push(existingProduct);
    } else {
      // existingProduct.items += 0;
    }

    // Dispatch the addTowishlist action to update the Redux state
    dispatch(addTowishlist(existingProduct));

    // Update localStorage
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  };

  const handleSectionProductStatus = (productClassId, hasProducts) => {
    setSectionHasProducts((prevState) => ({
      ...prevState,
      [productClassId]: hasProducts,
    }));
  };

  // const productThumbnail =
  // productInfo.productImages.productThumbnail.url.replace(
  //   productInfo.productImages.productThumbnail.url.split("/")[6],
  //   "w_300,h_300",
  // );

  return (
    <div className="mx-auto w-full border-b-[1px] border-b-gray-300">
      <div className="mx-auto mt-10 max-w-container p-4">
        <div className="-mt-5 h-full w-full pb-10 xl:-mt-8">
          <div className="flex flex-col gap-1">
            <div ref={topDivRef} className="h-1 cursor-pointer"></div>
            <div className="flex flex-col items-start justify-between gap-12 p-2 sml:flex-row sml:flex-wrap">
              <ProductImages
                productImages={product.productDetails.productImages}
                activeImage={product.activeImage}
                dispatch={dispatch}
                productId={product.productDetails.id}
                handleAddwishlist={handleAddwishlist}
              />
              <ProductMainInfo
                product={product.productDetails}
                dispatch={dispatch}
                selectedMeasurement={product.selectedMeasurement}
                selectedColor={product.selectedColor}
                activeImage={product.activeImage}
              />
              {/* <CheckoutDetails product={product} /> */}
              {/* <ProductSecondaryInfo product={product.productDetails} /> */}
            </div>
            {product.productDetails?.attributes?.length > 0 &&
              product.productDetails?.attributes[0].key !== null && (
                <div className="mt-4 grid gap-5 md:grid-cols-2">
                  <table className="h-fit table-auto rounded shadow-lg">
                    <p className="py-2 text-xl font-semibold capitalize">
                      Specifications :
                    </p>
                    {product.productDetails?.attributes.map(
                      (attribute, index) => {
                        return (
                          <tr className="border">
                            <td className="border border-black">
                              {attribute.key}
                            </td>
                            <td className="border border-black">
                              {attribute.value}
                            </td>
                          </tr>
                        );
                      },
                    )}
                  </table>

                  <div className=" " onClick={scrollToTop}>
                    <p className="py-2 text-xl font-semibold capitalize">
                      Related Products
                    </p>

                    <RelatedProducts
                      productClassId={product?.productDetails?.productClass}
                    />
                  </div>
                </div>
              )}
          </div>
          {product.productDetails?.attributes[0]?.key == null && (
            <div
              onClick={scrollToTop}
              className="mx-auto mt-10 max-w-container space-y-4"
            >
              <h1 className="m-auto my-6 text-center text-2xl font-bold">
                Related Products
              </h1>
              <ProductSection
                // key={`${productClass.id}`}
                productClassId={product?.productDetails?.productClass}
                // category={product?.productDetails?.category}
                // setIsSectionHasProduct={(hasProducts) =>
                //   handleSectionProductStatus(
                //     product?.productDetails?.productClass,
                //     hasProducts
                //   )
                // }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
