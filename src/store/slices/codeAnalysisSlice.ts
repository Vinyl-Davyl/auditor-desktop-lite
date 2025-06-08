import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CodeAnalysisResult } from "../../services/codeAnalysis";

interface CodeAnalysisState {
  files: string[];
  isAnalyzing: boolean;
  results: Record<string, CodeAnalysisResult>;
  selectedFile: string | null;
}

const initialState: CodeAnalysisState = {
  files: [],
  isAnalyzing: false,
  results: {},
  selectedFile: null,
};

const codeAnalysisSlice = createSlice({
  name: "codeAnalysis",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<string[]>) => {
      state.files = action.payload;
    },
    setIsAnalyzing: (state, action: PayloadAction<boolean>) => {
      state.isAnalyzing = action.payload;
    },
    setAnalysisResult: (state, action: PayloadAction<CodeAnalysisResult>) => {
      state.results[action.payload.filePath] = action.payload;
    },
    setSelectedFile: (state, action: PayloadAction<string | null>) => {
      state.selectedFile = action.payload;
    },
    clearResults: (state) => {
      state.results = {};
      state.selectedFile = null;
    },
  },
});

export const { setFiles, setIsAnalyzing, setAnalysisResult, setSelectedFile, clearResults } = codeAnalysisSlice.actions;

export default codeAnalysisSlice.reducer;
