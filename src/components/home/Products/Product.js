import React from "react";
import Image from "../../designLayouts/Image";
import Badge from "./Badge";
import { useNavigate, useLocation } from "react-router-dom";
import { useCurrency } from "../../Currency/CurrencyProvider/CurrencyProvider";
import DisplayCurrency from "../../Currency/DisplayCurrency/DisplayCurrency";
import { BsCart3 } from "react-icons/bs";
import { current } from "@reduxjs/toolkit";

// change i made
const Product = ({ productInfo }) => {
  const rootId = productInfo.id;
  const navigate = useNavigate();
  const location = useLocation();

  console.log("productInfo", productInfo);

  const { fromCurrency, toCurrency, getConvertedAmount } = useCurrency();

  const currentPathName = location.pathname;

  const handleProductDetails = () => {
    const separatedRoute = currentPathName.split("/");
    if (separatedRoute[1] === "accounts") {
      navigate("/accounts/product", {
        state: {
          productId: productInfo.id,
        },
      });
    } else {
      navigate("/product", {
        state: {
          productId: productInfo.id,
        },
      });
    }
  };

  const handleAddCart = (event) => {
    //  prevents the click event from propagating to the parent div
    event.stopPropagation();
    console.log("add to cart");
  };

  let headerIconStyles =
    "  ml-2  inline-block lg:hover:text-[#1D6F2B] lg:hover:bg-[#E5E5E5] lg:hover:rounded-full py-1.5 px-2.5";
  return (
    <div
      className="w-full h-64 relative group border-2 border-gray-100 rounded-md cursor-pointer"
      onClick={handleProductDetails}
    >
      {productInfo.productImages !== undefined ? (
        <>
          <div className="max-w-80 h-[70%] relative overflow-y-hidden ">
            <div>
              <Image
                className="min-w-full min-h-[100px] rounded-tl-md rounded-tr-md"
                imgSrc={productInfo.productImages.productThumbnail.url}
              />
            </div>
            <div className="absolute top-3 left-4">
              {productInfo.discountPercentage > 0 && (
                <Badge text={`- ${productInfo.discountPercentage}%`} />
              )}
            </div>
          </div>
          <div className="max-w-80 bg-white py-2 flex flex-col gap-1 rounded-bl-md rounded-br-md border-t-0 px-2">
            <div className="flex flex-col  font-titleFont">
              <h2 className="text-xs text-primeColor font-[500] text-ellipsis overflow-hidden hover:underline">
                {productInfo.name}
              </h2>
              <div className="text-sm flex justify-between ">
                <div>
                  <div className="text-[#1D6F2B] font-semibold">
                    <DisplayCurrency
                      amount={
                        productInfo.discountPercentage > 0
                          ? productInfo.discountedPrice
                          : productInfo.price
                      }
                      currencyCode={toCurrency}
                    />
                  </div>
                  {productInfo.discountPercentage > 0 && (
                    <p className="text-[#00000080] line-through">
                      <DisplayCurrency
                        amount={productInfo.price}
                        currencyCode={toCurrency}
                      />
                    </p>
                  )}
                </div>

                <BsCart3
                  className={headerIconStyles}
                  onClick={(event) => handleAddCart(event)}
                  size={40}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Product;
