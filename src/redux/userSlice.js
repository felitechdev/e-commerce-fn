import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfo: {
            profile: {},
            whishlist: [],
            cart: [],
            logInType: ""
          },
    },
    reducers: {
        updateUserInfo: (state, action) => { 
            state.userInfo.profile = action.payload
        },
        logIn: (state, action) => { 
            state.userInfo.profile = action.payload.profile
            state.userInfo.logInType = action.payload.logInType
        },
        addSingleCartItem: (state, action) => { 
            let item = state.userInfo.cart.find(
                (item) => (item._id === action.payload._id));
            if (item) {
                item = action.payload
              } else {
                state.userInfo.cart.push(action.payload)
              }
            
        },
        resetUserInfo: (state) => { 
            state.userInfo = {
                profile: {},
                wishlist: [],
                cart: []
            }
        },
        updateUserCart: (state, action) => { 
            state.userInfo.cart = action.payload
        },
        deleteCartItem: (state, action) => { 
            state.userInfo.cart = state.userInfo.cart.filter(
                (item) => item._id !== action.payload
            );
        },
        reset_userCart: (state) => { 
            state.userInfo.cart = []
        }
    }

})

export const {
    updateUserInfo,
    addSingleCartItem,
    resetUserInfo,
    logIn,
    updateUserCart,
    deleteCartItem,
    reset_userCart,
} = userSlice.actions

export default userSlice.reducer

