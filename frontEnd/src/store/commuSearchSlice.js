import { createSlice } from '@reduxjs/toolkit';

const commuSideBarSlice = createSlice({
  name: 'commuSideBar',
  initialState: {
    content: {
      content: [{id: -1, createdAt: "i dont know when i was born"}, {id: -2, createdAt: "i dont know when i was born"}] 
    }  
  },
  reducers: {
    setBoardSearch: (state, action) => {
      state.content = action.payload;
    },
  },
});

export default commuSideBarSlice;
export const { setBoardSearch } = commuSideBarSlice.actions;