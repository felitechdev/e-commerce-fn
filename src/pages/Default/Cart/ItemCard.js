import React from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  drecreaseQuantity,
  increaseQuantity,
} from "../../../redux/productsSlice";
import axios from "axios";
import { deleteCartItem, updateCartItem } from "../../../redux/userSlice";

const ItemCard = ({ itemInfo, userInfo, userCart }) => {
  const dispatch = useDispatch();
  // const userCart = useSelector(state => state.)
  const removeCartItem = (id) => {
    if (userInfo && Object.keys(userInfo.profile).length > 0) {
      axios({
        url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/delete/cartitem/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
        }
      }).then((data) => {
        if (data.status === 200) {
          dispatch(deleteCartItem(id))
        }
      })
    } else { 
      dispatch(deleteItem(id))
    }
    
  }
  const increaseQuantity = (id) => { 
    if (userInfo && Object.keys(userInfo.profile).length > 0) {
      const existingItem = userCart.find(item => item._id === id)
      if (existingItem) { 
        axios({
          url: `${process.env.REACT_APP_BACKEND_SERVER_URL}/edit/cartitem/${id}`,
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`
          },
          data: {quantity: existingItem.quantity + 1}
        })
          .then(res => {
            console.log(res.data.data);
            dispatch(updateCartItem({
              _id: res.data.data._id,
              selectedProductImage: res.data.data.selectedProductImage,
              itemName: res.data.data.product.name,
              selectedProductColor: res.data.data.selectedProductColor,
              size: res.data.data.size,
              quantity: res.data.data.quantity,
              price: res.data.data.price,
              productTotalCost: res.data.data.productTotalCost,
              deliveryFee: res.data.data.deliveryFee,
              availableUnits: res.data.data.availableUnits,
              quantityParameter: res.data.data.quantityParameter,
            }))

            // _id: newId,
            //productId:  props.DBProductInfo._id,
            // selectedProductImage,
            //itemName: props.DBProductInfo.name,
            // selectedProductColor,
            //size: props.cartItemInfo.size,
            //            quantity: props.cartItemInfo.quantity,
            //            price,
            //            productTotalCost,
            //            deliveryFee: props.cartItemInfo.deliveryFee,
            //            availableUnits: props.DBProductInfo.stockQuantity,
            //            quantityParameter: props.DBProductInfo.quantityParameter,

       

          })
      }
      
    }
    
  }

  return (
    <div className="w-full grid grid-cols-5 mb-4 border py-2 rounded-lg">
      <div className="flex col-span-5 mdl:col-span-2 items-center gap-4 ml-4">
        <ImCross
          onClick={() => removeCartItem(itemInfo._id)}
          className="text-[#1D6F2B] hover:text-red-500 duration-300 cursor-pointer"
        />
        <img className="w-32 h-32" src={itemInfo.selectedProductImage} alt="productImage" />
        <div>
          <h1 className="font-titleFont font-semibold">{itemInfo.itemName}</h1>
          <h2 className="text-sm">Color: {itemInfo.selectedProductColor}</h2>
          <h2 className="text-sm">Size: {itemInfo.size}</h2>
        </div>
        
      </div>
      <div className="col-span-5 mdl:col-span-3 flex items-center justify-between py-4 mdl:py-0 px-4 mdl:px-0 gap-6 mdl:gap-0">
        <div className="flex w-1/3 items-center text-lg font-semibold">
          {itemInfo.price} RWF
        </div>
        <div className="w-1/3 flex items-center gap-6 text-lg">
          <span
            onClick={() => dispatch(drecreaseQuantity({ _id: itemInfo._id }))}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            -
          </span>
          <p>{itemInfo.quantity}</p>
          <span
            onClick={() => increaseQuantity(itemInfo._id)}
            className="w-6 h-6 bg-gray-100 text-2xl flex items-center justify-center hover:bg-gray-300 cursor-pointer duration-300 border-[1px] border-gray-300 hover:border-gray-300"
          >
            +
          </span>
        </div>
        <div className="w-1/3 flex flex-col font-titleFont">
          <p className="items-center font-bold text-lg">{itemInfo.productTotalCost} RWF</p>
          <p className="text-xs">{itemInfo.deliveryFee > 0 ?
            `Includes delivery fee of ${itemInfo.deliveryFee} RWF ` :
            "Free delivery"}</p>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
