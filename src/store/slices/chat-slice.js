import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  /** Allowlisted model id the user picked, or null to follow the server default. */
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
