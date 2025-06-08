import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  sidebarOpen: boolean;
  theme: "light" | "dark";
  activeTab: "analysis" | "settings" | "help";
}

const initialState: UIState = {
  sidebarOpen: true,
  theme: "dark",
  activeTab: "analysis",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setTheme: (state, action: PayloadAction<"light" | "dark">) => {
      state.theme = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<"analysis" | "settings" | "help">) => {
      state.activeTab = action.payload;
    },
  },
});

export const { toggleSidebar, setTheme, setActiveTab } = uiSlice.actions;
export default uiSlice.reducer;
