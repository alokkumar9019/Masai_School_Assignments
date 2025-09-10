import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { FeedbackEntry } from "./types";

 type FeedbackEntry = {
  id: string;
  name: string;
  email: string;
  rating: number;
  feedback: string;
  date: string;
};
type FeedbackState = {
  entries: FeedbackEntry[];
};

const initialState: FeedbackState = {
  entries: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    addFeedback(state, action: PayloadAction<FeedbackEntry>) {
      state.entries.push(action.payload);
    },
  },
});

export const { addFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
