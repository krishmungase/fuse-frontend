import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedModel: null,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedModel: (state, action) => {
      state.selectedModel = action.payload
    },
  },
})

export const { setSelectedModel } = chatSlice.actions
export default chatSlice.reducer
