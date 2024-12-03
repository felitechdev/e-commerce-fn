import React, { useState } from "react";
import SmallImagesContainer from "./SmallImagesContainer";
import DisplayCurrency from "../../components/Currency/DisplayCurrency/DisplayCurrency";
import CheckoutDetails from "./CheckoutDetails";
import { useEffect } from "react";

function removeDuplicateMeasurement(variations) {
  const measuremts = variations.reduce((acc, variation) => {
    const newMeasuremt = acc.find(
      (measurement) => measurement.measurement === variation.measurementvalue,
    );

    if (!newMeasuremt)
      return [
        ...acc,
        {
          measurement: variation?.measurementvalue,
          qunatity: variation?.colorMeasurementVariationQuantity,
          color: variation?.colorImg?.colorName,
        },
      ];
    else return [...acc];
  }, []);

  return measuremts;
}

const ProductMainInfo = ({
  product,
  dispatch,
  selectedMeasurement,
  selectedColor,
  activeImage,
}) => {
  const measurements = removeDuplicateMeasurement(
    product.colorMeasurementVariations.variations,
  );

  const handleSizeClick = (e) => {
    dispatch({
      type: "sizeSelected",
      payload: e.target.textContent,
    });
  };
  const [productImages, setProductImages] = useState([]);
  // Notify User when color size combination selected is not available
  const handleInsufficientQuantityHover = (e) => {
    alert(
      `${product.name}: ${selectedColor} : ${e.target.textContent} not available.`,
    );
  };

  useEffect(() => {
    if (product?.colorMeasurementVariations.variations.length > 0) {
      setProductImages(product?.colorMeasurementVariations.variations);
    }
  }, [product?.colorMeasurementVariations]);

  return (
    <div className="w-container flex flex-col gap-5 lg:max-w-[60%] xl:w-[60%]">
      <div className="flex-row justify-between md:flex md:grid-cols-2">
        <div>
          <div>
            <p className="h-max-[65px] block w-full text-xl font-semibold capitalize">
              {product?.name}
            </p>
            <hr className="m-auto my-3 h-0.5 w-[50%] border-0 bg-gray-200"></hr>
          </div>{" "}
          {product?.description.length > 0 && (
            <p
              className="w-full overflow-auto break-words p-0 text-gray-600"
              dangerouslySetInnerHTML={{
                __html: product.description,
              }}
            ></p>
          )}
          <div>
            <p className="mb-1 block text-lg font-semibold">Price:</p>
            <div>
              {product.discountPercentage <= 0 && (
                <div className="font-semibold text-[#1D6F2B]">
                  <DisplayCurrency product={product} isDiscount={true} />
                </div>
              )}
              {product.discountPercentage > 0 && (
                <div>
                  <div className="font-semibold text-[#1D6F2B]">
                    <DisplayCurrency product={product} isDiscount={true} />
                  </div>

                  <div className="font-semibold text-[#00000080] line-through">
                    <DisplayCurrency product={product} isDiscount={false} />
                  </div>
                </div>
              )}
            </div>

            {product?.discountPercentage > 0 && (
              <p className="ml-3 inline-block rounded-2xl bg-[rgba(201,195,195,0.39)] px-[10px] py-[4px] text-xs font-semibold text-[#FF4747]">
                {product?.discountPercentage + "% off"}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            {product.hasColors && productImages.length > 0 && (
              <div>
                <p className="mb-4 flex items-center text-lg font-semibold capitalize">
                  <span className="me-2 rounded bg-[#1D6F2B] px-2.5 py-0.5 text-base font-medium text-white">
                    Color:
                  </span>
                  {selectedColor}
                </p>
                <SmallImagesContainer
                  images={productImages.map((variation) => variation.colorImg)}
                  activeImage={activeImage}
                  dispatch={dispatch}
                  variations={productImages}
                  feature="colorImages"
                  selectedMeasurement={selectedMeasurement}
                />
              </div>
            )}

            {product.hasMeasurements && measurements.length > 0 && (
              <div>
                <p className="mb-4 flex items-center text-lg font-semibold capitalize">
                  <span className="me-2 rounded bg-[#1D6F2B] px-2.5 py-0.5 text-base font-medium text-white">
                    {product?.colorMeasurementVariations.measurementType}:
                  </span>
                  {selectedMeasurement}
                </p>

                <div className="flex flex-wrap gap-1">
                  {measurements.map((measurement) => {
                    const colorMeasurementCombinationNotAvailable =
                      selectedColor === measurement.color &&
                      measurement.qunatity === 0;
                    return (
                      <button
                        disabled={colorMeasurementCombinationNotAvailable}
                        onMouseOver={(e) => {
                          colorMeasurementCombinationNotAvailable &&
                            handleInsufficientQuantityHover(e);
                        }}
                        key={measurement.measurement}
                        className={`cursor-pointer rounded-lg border-[2px] px-2 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-30 ${
                          selectedMeasurement === measurement.measurement
                            ? "border-7 border-dashed border-orange-400 shadow-orange-400 drop-shadow-xl"
                            : ""
                        }`}
                        onClick={handleSizeClick}
                      >
                        {measurement.measurement}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="m-auto mr-1">
          {product && <CheckoutDetails product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductMainInfo;
