import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionSearchParams: { hostId: "", title: "" }
};

const sessionListSlice = createSlice({
  name: "sessionList",
  initialState,
  reducers: {
    onChangeSessionSearchParams(state, action) {
      const { searchTitle, searchHostId } = action.payload;
      state.sessionSearchParams.title = searchTitle;
      state.sessionSearchParams.hostId = searchHostId;
    }
  }
});

export const { onChangeSessionSearchParams } = sessionListSlice.actions;

export default sessionListSlice;