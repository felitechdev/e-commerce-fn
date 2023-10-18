import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userInfo",
    initialState: {
        userInfo: {
            profile: {},
            whishlist: [],
            cart: [],
          },
    },
    reducers: {
        updateUserInfo: (state, action) => { 
            state.userInfo.profile = action.payload
        },
        addToUserCart: (state, action) => { 
            state.userInfo.cart = action.payload
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
} = userSlice.actions

export default userSlice.reducer

