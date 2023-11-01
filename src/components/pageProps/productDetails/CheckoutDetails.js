import { useDispatch } from "react-redux";
import { addToDefaultCart } from "../../../redux/productsSlice";
import { addToUserCart } from "../../../redux/userSlice";
import SelectorsContainer from "./SelectorsContainer";

const CheckoutDetails = (props) => { 
    const handleAddToCart = () => { 
        if (Object.keys(props.userInfo.profile).length > 0) {
           return dispatch(
                addToUserCart(props.DBProductInfo)
            )
        } else { 
          return  dispatch(
                addToDefaultCart(props.DBProductInfo)
            )
        }
    }


    const dispatch = useDispatch();
    return (
        <div className="flex flex-col sml:min-w-[300px] lg:w-[20%] sml:max-h-[400px] gap-3 border-[2px] p-4 rounded-lg">
            <div>
                <p className="text-base mb-1 block font-semibold">Delivery</p> 
                
                <div className="mb-3">
                    <p className="text-sm mb-1 block font-normal">Delivery Fee: </p>
                    <SelectorsContainer 
                        cartItemInfo={props.cartItemInfo}
                        setCartItemInfo={props.setCartItemInfo}
                        values={["1000 RWF Kigali", "3000 RWF outside Kigali"]}
                        itemType="deliveryFee"
                        size="small"
                    />
                </div> 
                <div className="mb-3">
                    <p className="text-sm inline-block font-normal">Estimated derivery: </p>
                    <span className="text-sm ml-2">30 - 60 minutes </span>
                </div>
                <hr className="w-full h-[1px] border-0 bg-gray-200 mb-3"></hr>
            </div>
            <div>
                <p className="text-base mb-2 block font-semibold">Quantity</p> 
                <div className="flex flex-row mb-1 gap-2 items-center text-center">
                    <span className="bg-[#E5E5E5] w-[20px] h-[20px] rounded-full">-</span>
                    <p className="text-sm font-semibold">1</p>
                    <span className="bg-[#E5E5E5] w-[20px] h-[20px] rounded-full">+</span>
                </div>
                <p className="text-xs text-[#00000080] ">65 bottles available</p>
            </div>
            <div className="flex flex-col gap-2 mt-8">
                <button
                    onClick={() => handleAddToCart()}
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
