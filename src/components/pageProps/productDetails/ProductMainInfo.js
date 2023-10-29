import React from "react";
import SmallImagesContainer from "./SmallImagesContainer";

const ProductMainInfo = ({ productInfo }) => {
  return (
    <div className="flex flex-col w-container lg:min-w-[25%] xl:w-[30%] gap-5 ">
      <div>
        <p className="w-full h-max-[65px] text-xl font-semibold block">{productInfo.name}</p>
        <hr className="w-full h-0.5 border-0 bg-gray-200 my-3"></hr>
      </div>
      <div >
        <p className="text-lg mb-1 block font-semibold">Price:</p>
        <p className="text-2xl text-[#1D6F2B] font-semibold">{
          (productInfo.discountPercentage > 0)
            ? productInfo.discountedPrice : productInfo.price
        } RWF</p>
        {productInfo.discountPercentage > 0
          ? <p className="inline-block text-base text-[#00000080] font-normal line-through">{productInfo.price} RWF</p> 
          : ""
        }
        {(productInfo.discountPercentage > 0) &&
          <p className="inline-block text-xs bg-[rgba(201,195,195,0.39)] py-[4px] px-[10px] ml-3 rounded-2xl text-[#FF4747] font-bold">
            {productInfo.discountPercentage + "% off"}
          </p>}
        
      </div>
      {productInfo.productImages.colorImages.length > 0 && 
        <div>
          <p className="text-lg mb-1 block font-semibold">Color:</p>
          <SmallImagesContainer images={productInfo.productImages.colorImages} /> { /** array of images passed */}
        </div>
      }

      {productInfo.availableSizes.length > 0 && (
          <div>
            <p className="text-lg mb-1 block font-semibold">Size:</p>
            <div className="flex flex-wrap gap-1">{productInfo.availableSizes.map((size) => { 
              return <div className="text-sm border-[2px] rounded-lg py-1 px-2">{size}</div>
            })} 
            </div>
          </div>
      )}
    </div>
  );
};

export default ProductMainInfo;
