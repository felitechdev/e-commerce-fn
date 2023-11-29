import { useDispatch } from "react-redux";
import { addToDefaultCart } from "../../../redux/productsSlice";
import { addSingleCartItem } from "../../../redux/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CheckoutDetails = (props) => { 
    const [selectedDelivery, setSelectedDelivery] = useState({ itemvalue: null, itemlabel: null});
    const [errorMessage, setErrorMessage] = useState("")
    const [eventDataset, setEventDataset] = useState("")
    const defaultCart = useSelector((state) => state.productsReducer.products)

    const dispatch = useDispatch();
    
    const handleDeliveryChoice = (e) => { 
        const { itemvalue, itemlabel } = e.currentTarget.dataset;
        setSelectedDelivery(prevState => ({
            ...prevState,
            itemvalue,
            itemlabel
        }));
    }

    useEffect(() => {

        if (selectedDelivery.itemvalue !== null && selectedDelivery.itemlabel !== null) { 
            props.setCartItemInfo({
                ...props.cartItemInfo,
                deliveryFee: parseInt(selectedDelivery.itemvalue),
            });
        }

    }, [selectedDelivery]);

    const ValidateCartInfo = () => { 
        if (props.cartItemInfo.colorId === "") {
            setErrorMessage("Please select a product color before proceeding.")
            return errorMessage;
        } else if (props.cartItemInfo.deliveryFee === undefined) {
            setErrorMessage("Please select a delivery option before proceeding.")
            return errorMessage;
        } else if (props.cartItemInfo.size === "") {
            setErrorMessage("Please select a size option before proceeding.")
            return errorMessage;
        } else if (props.cartItemInfo.quantity === 0) {
            setErrorMessage("Please select the quantity before proceeding.")
            return errorMessage;
        } else { 
            return true;
        }
    }

 
    const handleAddToCart = () => { 
        console.log(props.DBProductInfo);
        
        const validateCart = ValidateCartInfo()

        if (validateCart === true) { // proceed adding to cart
            if (Object.keys(props.userInfo.profile).length > 0) {
                const cartItemData = {
                    product: props.cartItemInfo.productDBId,
                    colorId: props.cartItemInfo.colorId,
                    size: props.cartItemInfo.size,
                    deliveryFee: props.cartItemInfo.deliveryFee,
                    quantity: props.cartItemInfo.quantity,
                }
                
                axios({
                    url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/cartitem/create`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
                    },
                    data: cartItemData,
                }).then(res => {
                    dispatch(addSingleCartItem({
                        _id: res.data._doc._id,
                        productId: res.data._doc.product._id, 
                        selectedProductImage: res.data.selectedProductImage,
                        itemName: res.data._doc.product.name,
                        selectedProductColor: res.data.selectedProductColor,
                        size: res.data._doc.size,
                        quantity: res.data._doc.quantity,
                        price: res.data.price,
                        productTotalCost: res.data.productTotalCost,
                        deliveryFee: res.data._doc.deliveryFee,
                        availableUnits: res.data.availableUnits,
                        quantityParameter: res.data.quantityParameter
                      }))
                }).catch(error => console.log(error))
            } else { 
                const newId = defaultCart && defaultCart.length > 0
                    ? defaultCart[defaultCart.length - 1]._id + 1 : 0;
                const selectedColorArray = props.DBProductInfo.productImages.colorImages
                    .filter(colorProperties => colorProperties._id === props.cartItemInfo.colorId)
                const selectedProductImage = selectedColorArray[0].url
                const selectedProductColor = selectedColorArray[0].colorName
                const price = props.DBProductInfo.discountedPrice > 0
                    ? props.DBProductInfo.discountedPrice : props.DBProductInfo.price 
                const productTotalCost = (props.cartItemInfo.quantity * price) + props.cartItemInfo.deliveryFee

                return  dispatch(
                   addToDefaultCart({
                       _id: newId,
                       productId:  props.DBProductInfo._id,
                       selectedProductImage,
                       itemName: props.DBProductInfo.name,
                       selectedProductColor,
                       size: props.cartItemInfo.size,
                       quantity: props.cartItemInfo.quantity,
                       price,
                       productTotalCost,
                       deliveryFee: props.cartItemInfo.deliveryFee,
                       availableUnits: props.DBProductInfo.stockQuantity,
                       quantityParameter: props.DBProductInfo.quantityParameter,
                    })
                )
            }
        }
    }

    useEffect(() => { 
        setErrorMessage("")
    }, [props.cartItemInfo])

    return (
        <div className="flex flex-col sml:min-w-[300px] mdl:w-[20%] sml:max-h-[400px] gap-3 border-[2px] p-4 rounded-lg">
            <div>
                <p className="text-base mb-1 block font-semibold">Delivery</p> 
                
                {props.DBProductInfo.deliveryInfo.length > 0 && (
                    <div className="mb-3">
                        <p className="text-sm mb-1 block font-normal">Delivery Fee: </p>
                        <div className="flex flex-wrap gap-1">
                            {props.DBProductInfo.deliveryInfo.map((deliveryInfo, index) => {
                                return <div
                                    key={index}
                                    className={`border-[2px] rounded-lg py-1 px-2 cursor-pointer text-xs ${selectedDelivery &&
                                            selectedDelivery.itemvalue === deliveryInfo.deliveryFee &&
                                            selectedDelivery.itemlabel === deliveryInfo.deliveryType
                                            ? 'item-selected'
                                            : 'border-gray-200'
                                     }
                                        }`}
                                    data-itemvalue={deliveryInfo.deliveryFee}
                                    data-itemlabel="deliveryFee"
                                    onClick={ handleDeliveryChoice }
                                    
                                >
                                    {`${deliveryInfo.deliveryFee} RWF ${deliveryInfo.deliveryType}`}
                                </div>
                            })}
                        </div>    

                    </div> 
                )}
                <div className="mb-3">
                    <p className="text-sm inline-block font-normal">Estimated derivery: </p>
                    <span className="text-sm ml-2">30 - 60 minutes </span>
                </div>
                <hr className="w-full h-[1px] border-0 bg-gray-200 mb-3"></hr>
            </div>
            <div>
                <p className="text-base mb-2 block font-semibold">Quantity</p> 
                <div className="flex flex-row mb-1 gap-2 items-center text-center">
                    <button
                        className="bg-[#E5E5E5] w-[20px] h-[20px] rounded-full text-sm font-bold cursor-pointer hover:bg-[#c8c9ca]"
                        onClick={() => props.setCartItemInfo(
                            (props.cartItemInfo.quantity > 0) ? {
                                ...props.cartItemInfo,
                                quantity: props.cartItemInfo.quantity - 1,
                            } : {
                                ...props.cartItemInfo,
                                quantity: props.cartItemInfo.quantity,
                            })}
                    >-</button>
                    <p className="text-sm font-semibold" pattern="[0-9]*" >{props.cartItemInfo.quantity}</p>
                    <button
                        className="bg-[#E5E5E5] w-[20px] h-[20px] rounded-full text-sm font-bold cursor-pointer hover:bg-[#c8c9ca]"
                        onClick={() => props.setCartItemInfo(
                            (props.cartItemInfo.quantity < props.DBProductInfo.stockQuantity) ? {
                                ...props.cartItemInfo,
                                quantity: props.cartItemInfo.quantity + 1,
                            } : {
                                ...props.cartItemInfo,
                                quantity: props.cartItemInfo.quantity,
                            })}
                    >+</button>
                </div>
                <p className="text-xs text-[#00000080] ">{props.DBProductInfo.stockQuantity} {props.DBProductInfo.quantityParameter} available</p>
            </div>
            <div className="flex flex-col gap-2 mt-8">
            {errorMessage && <p className="text-red-600 text-xs">{errorMessage}</p>}
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
