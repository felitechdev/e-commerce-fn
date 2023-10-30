import { FiHeart } from "react-icons/fi";

const ProductImages = (props) => {

    const handleImageClick = (e) => {
        props.setCartItemInfo({
            ...props.cartItemInfo,
            imagePreview: e.target.src
        })
    }

    return (
        <div className="mt-4 inline-block w-container lg:w-[35%]">
            <div className="flex flex-col gap-3 items-center">
                <div className="relative">
                    <FiHeart className="absolute right-2 bg-white hover:text-[#1D6F2B] hover:bg-[#E5E5E5] rounded-full py-1.5 px-2.5  cursor-pointer" size={40}/>
                    <img src={props.cartItemInfo.imagePreview} className="w-full" />
                </div> 
                <div className="flex flex-row gap-1">
                    <img
                        className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer"
                        src={props.DBProductInfo.productImages.productThumbnail.url}
                        onClick={handleImageClick}
                    />
                    { props.DBProductInfo.productImages.otherImages.map((imageInfo) => { 
                        return (<img
                            key={imageInfo._id}
                            className="w-[45px] h-[45px] border-[2px] rounded-lg cursor-pointer"
                            src={imageInfo.url}
                            imageid={imageInfo._id}
                            onClick={handleImageClick}
                            />);
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductImages;
