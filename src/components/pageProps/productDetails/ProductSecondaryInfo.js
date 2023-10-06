const ProductSecondaryInfo = ({productInfo}) => { 
    return (
        <div className="w-[70%] flex flex-col gap-6">
            <div className="border-b-2 h-8">
                <ul className="font-semibold">
                    <li className="inline-block cursor-pointer  bg-[#E5E5E5] py-[4px] px-[18px]">Description</li>
                    <li className="inline-block mr-6 cursor-pointer  hover:text-[#1D6F2B] py-[4px] px-[18px]">Reviews</li> 
                </ul>
            </div>
            <div>
                {productInfo.des}
                {"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"}
                <img src={productInfo.img}/>
            </div>
        </div>
    )
}

export default ProductSecondaryInfo;
