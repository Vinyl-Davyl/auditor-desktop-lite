import { configureStore } from "@reduxjs/toolkit";
import codeAnalysisReducer from "./slices/codeAnalysisSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    codeAnalysis: codeAnalysisReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
