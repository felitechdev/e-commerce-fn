import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userInfo",
    initialState: null,
    reducers: {
        updateUserInfo: (state, action) => { 
            state.userInfo = action.payload
        },
        resetUserInfo: (state) => { 
            state.userInfo = {}
        }
    }

})

export const {
    updateUserInfo,
    resetUserInfo,
} = userSlice.actions

export default userSlice.reducer

