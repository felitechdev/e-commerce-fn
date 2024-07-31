import React from "react";
import ProductImages from "./ProductImages";
import ProductMainInfo from "./ProductMainInfo";
import CheckoutDetails from "./CheckoutDetails";
import ProductSecondaryInfo from "./ProductSecondaryInfo";
import { useDispatch } from "react-redux";
import { addTowishlist } from "../../redux/Reducers/wishlist";
import { removeTowishlist } from "../../redux/Reducers/wishlist";
import discountedFinalPrice from "../../util/discountedFinalPrice";
export default function ProductDetails({ product, dispatch }) {
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
            productInfo.discountPercentage
          )
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

  return (
    <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
      <div className="max-w-container mx-auto p-4 mt-10">
        <div className="w-full  h-full -mt-5 xl:-mt-8 pb-10">
          <div className="flex flex-col gap-14">
            <div className="flex flex-col mdl:flex-row mdl:flex-wrap gap-12 items-center">
              <>
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
                <CheckoutDetails product={product} />

                <ProductSecondaryInfo product={product.productDetails} />
              </>
            </div>
          </div>
          {/* For testing similar products slider only */}
          {/* <ProductsSection heading='Similar Products'>
            <ProductsSliderContainer>
              {similarProducts.length &&
                similarProducts.map((product) => {
                  return (
                    <div key={product._id} className='px-2'>
                      <ProductPreview productInfo={product} />
                    </div>
                  );
                })}
            </ProductsSliderContainer>
          </ProductsSection> */}
        </div>
      </div>
    </div>
  );
}
