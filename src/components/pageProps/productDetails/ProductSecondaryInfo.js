const ProductSecondaryInfo = ({productInfo}) => { 
    return (
        <div className="w-container lgl:w-[70%] flex flex-col ">
            <div className="border-b-2 h-8">
                <ul className="font-semibold">
                    <li className="inline-block cursor-pointer  bg-[#E5E5E5] py-[4px] px-[18px]">Description</li>
                    <li className="inline-block mr-6 cursor-pointer  hover:text-[#1D6F2B] py-[4px] px-[18px]">Reviews</li> 
                </ul>
            </div>
            <div className="border-2 border-t-0 rounded-bl-md rounded-br-md py-3 px-4">
                {"description"}
                {"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
                <img src={productInfo.productImages.productThumbnail.url}/>
            </div>
        </div>
    )
}

export default ProductSecondaryInfo;
