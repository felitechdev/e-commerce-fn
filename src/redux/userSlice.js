import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "userInfo",
    initialState: null,
    reducers: {
        updateUserInfo: (state, action) => { 
            state.userInfo = action.payload
        }
    }

})

export const { updateUserInfo } = userSlice.actions

export default userSlice.reducer

