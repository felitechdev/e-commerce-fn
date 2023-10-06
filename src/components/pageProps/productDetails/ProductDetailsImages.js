import productImg from "../../../assets/images/test_product_img.jpg"
import SmallImagesContainer from "./SmallImagesContainer";

const ProductDetailsImages = () => {
    return (
        <div className="mt-4 inline-block min-w-[350px] max-w-[400px]">
            <div className="flex flex-col gap-3 items-center">
                <img src={productImg} className="w-full " />
                <SmallImagesContainer />
            </div>
        </div>
    )
}

export default ProductDetailsImages;
