import SmallImagesContainer from "./SmallImagesContainer";
import { FiHeart } from "react-icons/fi";

const ProductImages = ({productInfo}) => {
    return (
        <div className="mt-4 inline-block w-container lg:w-[35%]">
            <div className="flex flex-col gap-3 items-center">
                <div className="relative">
                    <FiHeart className="absolute right-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-1.5 px-2.5  cursor-pointer" size={40}/>
                    <img src={productInfo.productImages.productThumbnail.url} className="w-full" />
                </div>
                
                <SmallImagesContainer images={productInfo.productImages.otherImages} />
            </div>
        </div>
    )
}

export default ProductImages;
