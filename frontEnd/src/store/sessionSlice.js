import { createSlice } from "@reduxjs/toolkit";

// non-serializable object는 스토에에 직접 저장할 수 없으므로 Map을 사용하여 특정 id와 매핑한다
// 스토어에는 이 id값을 저장
// 세션에서 만들어진 웹소켓을 스토어에 매핑
export const websocketInstances = new Map();
// 참여자 목록을 스토어에 매핑
export const participantsInstances = new Map();


const initialState = {
  newMessage: {},
  sendMessage: "",
  websocketId: null,
  participantsId: null,
  updated: 0,
  imageData: null,
  countUsers: null
};


const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    sendChat(state, action) {
      // console.log(action.payload)
      state.sendMessage = action.payload;
    },
    receiveChat(state, action) {
      state.newMessage = action.payload;
    },
    setWebsocketId(state, action) {
      state.websocketId = action.payload;
    },
    setParticipantsId(state, action) {
      state.participantsId = action.payload;
    },
    receiveImageData(state, action) {
      state.imageData = action.payload;
    },
    setUpdated(state, action) {
      state.updated = (state.updated + 1) % 1000;
    },
    setCountUsers(state, action) {
      state.countUsers = action.payload;
    }
  }
});

export const { 
  receiveChat,  
  setWebsocketId, 
  setParticipantsId, 
  receiveImageData, 
  setUpdated,
  setCountUsers } = sessionSlice.actions;

export default sessionSlice;