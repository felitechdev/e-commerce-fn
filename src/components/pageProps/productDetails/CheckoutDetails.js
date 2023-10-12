import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/productsSlice";

const CheckoutDetails = ({productInfo}) => { 
    const dispatch = useDispatch();
    return (
        <div className="flex flex-col min-w-[320px] h-[400px] gap-3 border-[2px] p-4 rounded-lg">
            <div>
                <p className="text-base mb-1 block font-semibold">Delivery</p> 
                
                <div className="mb-3">
                    <p className="text-sm mb-1 block font-normal">Delivery Fee: </p>
                    <div className="flex flex-wrap gap-1">
                        <div className="text-xs border-[2px] rounded-lg py-1 px-2">1000 RWF Kigali</div>
                        <div className="text-xs border-[2px] rounded-lg py-1 px-2">3000 RWF outside Kigali</div>
                    </div>
                </div> 
                <div className="mb-3">
                    <p className="text-sm inline-block font-normal">Estimated derivery: </p>
                    <span className="text-sm ml-2">30 - 60 minutes </span>
                </div>
                <hr className="w-full h-[1px] border-0 bg-gray-200 mb-3"></hr>
            </div>
            <div>
                <p className="text-base mb-2 block font-semibold">Quantity</p> 
                <div className="flex flex-row mb-1 gap-2 items-center text-center ">
                    <button className="bg-[#E5E5E5] w-[24px] h-[24px] rounded-full px-[8px]">-</button>
                    <p className="text-sm font-semibold">1</p>
                    <button className="bg-[#E5E5E5] w-[24px] h-[24px] rounded-full px-[8px]">+</button>
                </div>
                <p className="text-xs text-[#00000080] ">65 bottles available</p>
            </div>
            <div className="flex flex-col gap-2 mt-8">
                <button
                    onClick={() =>
                        dispatch(
                            addToCart({
                            _id: productInfo.id,
                            name: productInfo.productName,
                            quantity: 1,
                            image: productInfo.img,
                            badge: productInfo.badge,
                            price: productInfo.price,
                            colors: productInfo.color,
                            })
                        )
                    }
                    className="hover:bg-[#f0f0f0] text-[#437a4c] cursor-pointer w-full text-base font-medium h-9 rounded-md duration-300 border-[2px] border-[#1D6F2B]"
                >
                    Add to Cart
                </button>
                <button 
                    className="bg-[#1D6F2B] hover:bg-[#437a4c] text-white cursor-pointer w-full text-base font-medium h-9 rounded-md duration-300"
                >
                    Buy Now
                </button>
            </div>           
        </div>
    )
}

export default CheckoutDetails;
