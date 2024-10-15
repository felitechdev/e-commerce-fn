import React,{useState} from "react";
import SmallImagesContainer from "./SmallImagesContainer";
import DisplayCurrency from "../../components/Currency/DisplayCurrency/DisplayCurrency";
import CheckoutDetails from "./CheckoutDetails";
import { useEffect } from "react";

function removeDuplicateMeasurement(variations) {
  const measuremts = variations.reduce((acc, variation) => {
    const newMeasuremt = acc.find(
      (measurement) => measurement.measurement === variation.measurementvalue
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
    product.colorMeasurementVariations.variations
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
      `${product.name}: ${selectedColor} : ${e.target.textContent} not available.`
    );
  };

  useEffect(() => {
    if (product?.colorMeasurementVariations.variations.length>0) {
     
      setProductImages(product?.colorMeasurementVariations.variations);
      
    }
  }
  , [product?.colorMeasurementVariations]);



  

  return (
    <div className="flex flex-col w-container lg:max-w-[60%] xl:w-[60%] gap-5  ">
      <div>
        <p className="w-full h-max-[65px] text-xl font-semibold block capitalize">
          {product?.name}
        </p>
        <hr className="w-full h-0.5 border-0 bg-gray-200 my-3"></hr>
      </div>

        {product?.description.length > 0 && (
          <p
            className=" text-gray-600 w-full p-0 break-words overflow-auto"
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          ></p>
        )}

{product?.attributes?.length > 0 && (
          <table className=" border table-auto  ">
            {product?.attributes.map((attribute, index) => {
              return (
                <tr className="border">
                  <td className="border border-black">{attribute.key}</td>
                  <td className="border border-black">{attribute.value}</td>
                </tr>
              );
            })}
          </table>
        )}

      <div>
        <p className="text-lg mb-1 block font-semibold">Price:</p>
        <div>
          {product.discountPercentage <= 0 && (
            <div className="text-[#1D6F2B] font-semibold">
              <DisplayCurrency product={product} isDiscount={true} />
            </div>
          )}
          {product.discountPercentage > 0 && (
            <>
              <div className=" text-[#1D6F2B] font-semibold  ">
                <DisplayCurrency product={product} isDiscount={true} />
              </div>

              <div className=" text-[#00000080] font-semibold line-through">
                <DisplayCurrency product={product} isDiscount={false} />
              </div>
            </>
          )}
        </div>
      
        {product?.discountPercentage > 0 && (
          <p className="inline-block text-xs bg-[rgba(201,195,195,0.39)] py-[4px] px-[10px] ml-3 rounded-2xl text-[#FF4747] font-semibold">
            {product?.discountPercentage + "% off"}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-between items-start">
      {product.hasColors &&
        productImages.length > 0 && (
          <div>
            <p className="text-lg font-semibold flex items-center mb-4 capitalize">
              <span className="bg-[#1D6F2B] text-white text-base font-medium me-2 px-2.5 py-0.5 rounded">
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
          <p className="text-lg font-semibold flex items-center mb-4 capitalize">
            <span className="bg-[#1D6F2B] text-white text-base font-medium me-2 px-2.5 py-0.5 rounded">
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
                  className={`border-[2px] rounded-lg py-1 px-2 cursor-pointer text-sm disabled:opacity-30 disabled:cursor-not-allowed ${
                    selectedMeasurement === measurement.measurement
                      ? "border-dashed border-7 border-orange-400 shadow-orange-400 drop-shadow-xl"
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
{
  product &&   <CheckoutDetails product={product} />
}

      </div>

   
    
       
    </div>
  );
};

export default ProductMainInfo;
