import React from "react";
import SmallImagesContainer from "./SmallImagesContainer";

const ProductInfo = ({ productInfo }) => {

  return (
    <div className="flex flex-col  gap-5 ">
      <div>
        <p className="w-full h-max-[65px] text-xl font-semibold block">{"productInfo.productName slkfjldsajflksajfdlk sjdaflkjdsalkfjsa lkdfj lksajfdl kjsa dflkjsal kdjf lksajdflkj sadl kfj slkd afjlkds afj"}</p>
        <hr className="w-full h-0.5 border-0 bg-gray-200 my-3"></hr>
      </div>
      <div >
        <p className="text-lg mb-1 block font-semibold">Price:</p>
        <p className="text-2xl text-[#1D6F2B] font-semibold">{productInfo.discountedPrice} RWF</p>
        <p className="inline-block text-base text-[#00000080] font-normal line-through">{productInfo.price} RWF</p>
        <p className="inline-block text-xs bg-[rgba(201,195,195,0.39)] py-[2px] px-[5px] ml-3 rounded-2xl text-[#FF4747] font-semibold">
          {productInfo.discountPercentage}% off</p>
      </div>
      <div>
        <p className="text-lg mb-1 block font-semibold">Color:</p>
        <SmallImagesContainer />
      </div>
      <div>
        <p className="text-lg mb-1 block font-semibold">Size:</p>
        <div className="flex flex-wrap gap-1">
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">0.5L Bottle</div>
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">1L Bottle</div>
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">1.5L Bottle</div>
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">2L Bottle</div>
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">3L Bottle</div>
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">4L Bottle</div>
          <div className="text-sm border-[2px] rounded-lg py-1 px-2">1L Bottle</div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
