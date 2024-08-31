// uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showCreateCampaign: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleCreateCampaign: (state) => {
      state.showCreateCampaign = !state.showCreateCampaign;
    },
  },
});

export const { toggleCreateCampaign } = uiSlice.actions;

export default uiSlice.reducer;
