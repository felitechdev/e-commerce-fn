import productImg from "../../../assets/images/test_product_img.jpg"

const SmallImagesContainer = () => { 
    return (
        <div className="flex flex-row gap-1">
            <img className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={productImg} />
            <img className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={productImg} />
            <img className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={productImg} />
            <img className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={productImg} />
            <img className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={productImg} />
            <img className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer" src={productImg} />
        </div>
    )
}

export default SmallImagesContainer;
