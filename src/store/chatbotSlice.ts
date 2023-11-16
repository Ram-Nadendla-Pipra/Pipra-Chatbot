import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ChatbotState {
  chatMessagesData: any;
  lastTyped: String;
  audioUrl: String;
}

const initialState: ChatbotState = {
  chatMessagesData: [],
  lastTyped: "",
  audioUrl: "",
};

export const chatbotSlice = createSlice({
  name: "chatbot",
  initialState,
  reducers: {
    setAudioUrl: (state, action: PayloadAction<any>) => {
      state.audioUrl = action.payload;
    },
    setChatMessagesData: (state, action: PayloadAction<any>) => {
      state.chatMessagesData = action.payload;
    },
    updateLastTyped: (state, action: PayloadAction<any>) => {
      state.lastTyped = action.payload;
    },
  },
});
export const { setChatMessagesData, updateLastTyped, setAudioUrl } =
  chatbotSlice.actions;

export default chatbotSlice.reducer;
