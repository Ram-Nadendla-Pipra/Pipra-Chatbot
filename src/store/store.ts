import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import chatbotSlice from "./chatbotSlice.ts";

export const store = configureStore({
	reducer: {
		chatbot:chatbotSlice
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
