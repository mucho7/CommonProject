import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCompileButtonOn: false,
  isDrawButtonOn: false,
  isMicButtonOn: true,
  isAuthorizeButtonOn: false,
  isChatButtonOn: false,
  isCompilePossible: true,
  isDrawPossible: true,
  isMicPossible: true
};

const toolBarActionSlice = createSlice({
  name: 'toolBarAction',
  initialState,
  reducers: {
    onClickCompileButton(state) {
      state.isCompileButtonOn = !state.isCompileButtonOn;
    },
    onClickDrawButton(state) {
      state.isDrawButtonOn = !state.isDrawButtonOn;
    },
    onClickMicButton(state) {
      state.isMicButtonOn = !state.isMicButtonOn;
    },
    onClickAuthorizeButton(state) {
      state.isAuthorizeButtonOn = !state.isAuthorizeButtonOn;
    },
    onClickChatButton(state) {
      state.isChatButtonOn = !state.isChatButtonOn;
    },
    setIsCompilePossible(state, action) {
      state.isCompilePossible = !state.isCompilePossible;
      if (!state.isCompilePossible) {
        state.isCompileButtonOn = false;
      }
    },
    setIsDrawPossible(state, action) {
      state.isDrawPossible = !state.isDrawPossible;
      if (!state.isDrawPossible) {
        state.isDrawButtonOn = false;
      }
    },
    setIsMicPossible(state, action) {
      state.isMicPossible = !state.isMicPossible;
      if (!state.isMicPossible) {
        state.isMicButtonOn = false;
      }
    },
  }
});

export const { 
  onClickCompileButton, 
  onClickDrawButton,
  onClickMicButton,
  onClickAuthorizeButton,
  onClickChatButton,
  setIsCompilePossible,
  setIsDrawPossible,
  setIsMicPossible
} = toolBarActionSlice.actions;

export default toolBarActionSlice;