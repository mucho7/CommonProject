import { createSlice } from "@reduxjs/toolkit";
import { readUserInfo, updateUserInfo } from "../api/member"

const initialState = { 
    userId: null,
    email: null,
    name: null, 
    since: null,

}

//
async function readUser(info) {
    const res = await readUserInfo(
        info,
        (data) => {
            return data.data
        },
        (err) => {
            console.log(err)
        })
    return res
}

// redux에 저장된 정보를 토대로 서버의 데이터를 손질
async function updateUser(info) {
    await updateUserInfo(
        info,
        (data) => {
            console.log(data)
            readUserInfo()
        }
    )
}

const updateUserSlice = createSlice({
    name: 'userInfoUpdate',
    initialState,
    reducers: {
        onEnterProfile: (state, action) => {
            state.userId = action.payload.userId
            readUser(
                {
                    userId: state.userId,
                    Authorization: action.payload.Authorization,
                    refreshToken: action.payload.refreshToken,
                }).then((temp) => {
                    state = temp
                    console.log(state)
                })
        },
        onUpdateSubmit: (state, action) => {
            state.id = action.payload.id
            state.email = action.payload.email
            state.name = action.payload.name
            state.since = action.payload.since
            console.log(state)
            updateUser(state)
        } 
    }
});

export default updateUserSlice;
export const { onEnterProfile, onUpdateSubmit} = updateUserSlice.actions;