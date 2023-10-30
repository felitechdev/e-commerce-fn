import React from "react";

const ProductMainInfo = (props) => {

  const handleImageClick = (e) => { 
    props.setCartItemInfo({
        ...props.cartItemInfo,
        imagePreview: e.target.src
    })
  }

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
      {props.DBProductInfo.productImages.colorImages.length > 0 && 
        <div>
          <p className="text-lg mb-1 block font-semibold">Color:</p>
          <div className="flex flex-row gap-1">
            {props.DBProductInfo.productImages.colorImages.map((imageInfo) => { 
                return <img
                        key={imageInfo._id}
                        className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer"
                        src={imageInfo.url}
                        imageid={imageInfo._id}
                        onClick={handleImageClick}
                />
            })}
          </div> { /** array of images passed **/}
        </div>
      }

      {props.DBProductInfo.availableSizes.length > 0 && (
          <div>
            <p className="text-lg mb-1 block font-semibold">Size:</p>
            <div className="flex flex-wrap gap-1">{props.DBProductInfo.availableSizes.map((size, index) => { 
              return <div key={index} className="text-sm border-[2px] rounded-lg py-1 px-2">{size}</div>
            })} 
            </div>
          </div>
      )}
    </div>
  );
};

export default ProductMainInfo;
