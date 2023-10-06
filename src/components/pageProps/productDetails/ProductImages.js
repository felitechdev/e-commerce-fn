import productImg from "../../../assets/images/test_product_img.jpg"
import SmallImagesContainer from "./SmallImagesContainer";
import { FiHeart } from "react-icons/fi";

const ProductImages = () => {
    return (
        <div className="mt-4 inline-block min-w-[350px] max-w-[400px]">
            <div className="flex flex-col gap-3 items-center">
                <div className="relative">
                    <FiHeart className="absolute right-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-1.5 px-2.5  cursor-pointer" size={40}/>
                    <img src={productImg} className="w-full" />
                </div>
                
                <SmallImagesContainer />
            </div>
        </div>
    )
}

export default ProductImages;
