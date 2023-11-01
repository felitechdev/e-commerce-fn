import React from "react";
import SmallImagesContainer from "./SmallImagesContainer";
import SelectorsContainer from "./SelectorsContainer";


const ProductMainInfo = (props) => {


  return (
    <div className="flex flex-col w-container lg:min-w-[25%] xl:w-[30%] gap-5 ">
      <div>
        <p className="w-full h-max-[65px] text-xl font-semibold block">{props.DBProductInfo.name}</p>
        <hr className="w-full h-0.5 border-0 bg-gray-200 my-3"></hr>
      </div>
      <div >
        <p className="text-lg mb-1 block font-semibold">Price:</p>
        <p className="text-2xl text-[#1D6F2B] font-semibold">{
          (props.DBProductInfo.discountPercentage > 0)
            ? props.DBProductInfo.discountedPrice : props.DBProductInfo.price
        } RWF</p>
        {props.DBProductInfo.discountPercentage > 0
          ? <p className="inline-block text-base text-[#00000080] font-normal line-through">{props.DBProductInfo.price} RWF</p> 
          : ""
        }
        {(props.DBProductInfo.discountPercentage > 0) &&
          <p className="inline-block text-xs bg-[rgba(201,195,195,0.39)] py-[4px] px-[10px] ml-3 rounded-2xl text-[#FF4747] font-bold">
            {props.DBProductInfo.discountPercentage + "% off"}
          </p>}
        
      </div>
      {props.DBProductInfo.productImages.colorImages.length > 0 && (
        <div>
          <p className="text-lg mb-1 block font-semibold">Color: {props.cartItemInfo.itemColorName}</p>
          <SmallImagesContainer
            imagesInfo={props.DBProductInfo.productImages.colorImages}
            cartItemInfo={props.cartItemInfo}
            setCartItemInfo={ props.setCartItemInfo}
            imageCategory="color-images"
          />{ /** array of images passed **/}
        </div>)}

      {props.DBProductInfo.availableSizes.length > 0 && (
          <div>
            <p className="text-lg mb-1 block font-semibold">Size:</p>
            <SelectorsContainer 
              cartItemInfo={props.cartItemInfo}
              setCartItemInfo={props.setCartItemInfo}
              values={props.DBProductInfo.availableSizes}
              itemType="size"
              size="large"
            />
          </div>
      )}
    </div>
  );
};

export default ProductMainInfo;
