import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
    user_id: null,
    jwt_token: null,
    refresh_token: null,
}

const userTokenSlice = createSlice({
    name: 'userAuthToken',
    initialState,
    reducers: {
        // logout: () => initialState,
        setUserToken(state, action)  {
            state.user_id = action.payload.userId
            state.tokenDict = action.payload.tokenDict

        },
        // onLoginSubmit: (state, action) => {
        //     const temp = onAsyncRequest(action.payload)
        //     if (temp !== false) {
        //         state.user_id = action.payload.userId
        //         state.tokenArr = temp
        //     }
        // } 
    }
});

export const { logout, setUserToken } = userTokenSlice.actions;

export default userTokenSlice;