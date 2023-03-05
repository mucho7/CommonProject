import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  code: null,
}

const compileSlice = createSlice({
  name: 'compile',
  initialState,
  reducers: {
    onChangeCode: (state, action) => {
      state.code = action.payload;
    },
  }
});

export default compileSlice;
export const { onChangeCode } = compileSlice.actions;