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
        addToUserCart: (state, action) => { 
            const item = state.userInfo.cart.find(
                (item) => item._id === action.payload._id
              );
              if (item) {
                item.quantity += action.payload.quantity;
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
        }
    }

})

export const {
    updateUserInfo,
    addToUserCart,
    resetUserInfo,
    logIn,
} = userSlice.actions

export default userSlice.reducer

