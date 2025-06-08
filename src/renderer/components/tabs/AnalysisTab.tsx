import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setFiles, setIsAnalyzing, setAnalysisResult, setSelectedFile } from "../../../store/slices/codeAnalysisSlice";
import {
  DocumentIcon,
  ArrowPathIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { analyzeFile } from "../../../services/codeAnalysis";

const AnalysisTab: React.FC = () => {
  const dispatch = useDispatch();
  const { files, isAnalyzing, results, selectedFile } = useSelector((state: RootState) => state.codeAnalysis);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  // Auto-hide error after 5 seconds
  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleFileSelect = async () => {
    try {
      const filePaths = await window.electron.ipcRenderer.invoke("select-files");
      if (filePaths && filePaths.length > 0) {
        dispatch(setFiles(filePaths));
        dispatch(setIsAnalyzing(true));

        // Analyze each file
        for (const filePath of filePaths) {
          try {
            const result = await analyzeFile(filePath);

            // Check if the result contains an error
            if (result.metrics.issues.some((issue) => issue.type === "error")) {
              const errorIssue = result.metrics.issues.find((issue) => issue.type === "error");
              if (errorIssue) {
                setError(errorIssue.message);
              }
            }

            dispatch(setAnalysisResult(result));
          } catch (fileError) {
            console.error(`Error analyzing file ${filePath}:`, fileError);
            setError(
              `Failed to analyze ${filePath}: ${fileError instanceof Error ? fileError.message : "Unknown error"}`
            );
          }
        }

        dispatch(setIsAnalyzing(false));
      }
    } catch (error) {
      console.error("Error selecting files:", error);
      setError(`Error selecting files: ${error instanceof Error ? error.message : "Unknown error"}`);
      dispatch(setIsAnalyzing(false));
    }
  };

  const getStatusColor = (maintainability: number) => {
    if (maintainability >= 70) return "text-green-800 bg-green-100 dark:text-green-200 dark:bg-green-900";
    if (maintainability >= 50) return "text-yellow-800 bg-yellow-100 dark:text-yellow-200 dark:bg-yellow-900";
    return "text-red-800 bg-red-100 dark:text-red-200 dark:bg-red-900";
  };

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />;
      case "warning":
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <InformationCircleIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative p-6 space-y-6">
      {/* Error Toast */}
      {showError && error && (
        <div className="flex fixed top-4 right-4 z-50 items-center p-4 mb-4 max-w-md text-red-800 bg-red-100 rounded-lg shadow-md dark:text-red-200 dark:bg-red-900">
          <ExclamationTriangleIcon className="mr-2 w-5 h-5" />
          <span className="text-sm font-medium">{error}</span>
          <button
            onClick={() => setShowError(false)}
            className="ml-auto -mx-1.5 -my-1.5 bg-red-100 dark:bg-red-900 text-red-500 dark:text-red-300 rounded-lg p-1.5 hover:bg-red-200 dark:hover:bg-red-800"
          >
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Code Analysis</h2>
        <button
          onClick={handleFileSelect}
          className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <DocumentIcon className="mr-2 w-5 h-5" />
          Select Files
        </button>
      </div>

      {isAnalyzing && (
        <div className="flex justify-center items-center p-8 bg-gray-50 rounded-lg dark:bg-gray-800">
          <ArrowPathIcon className="w-8 h-8 animate-spin text-primary-600" />
          <span className="ml-3 text-gray-700 dark:text-gray-300">Analyzing files...</span>
        </div>
      )}

      {Object.keys(results).length > 0 && !isAnalyzing && (
        <div className="grid grid-cols-1 gap-4">
          {Object.values(results).map((result) => (
            <div key={result.filePath} className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <DocumentIcon className="w-5 h-5 text-gray-500" />
                  <span className="ml-2 text-gray-900 dark:text-white">{result.filePath}</span>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    result.metrics.maintainability
                  )}`}
                >
                  {result.metrics.maintainability}% Maintainable
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Complexity</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">{result.metrics.complexity}</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Lines of Code</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.metrics.linesOfCode}
                  </div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Issues Found</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.metrics.issues.length}
                  </div>
                </div>
              </div>

              {result.metrics.issues.length > 0 && (
                <div className="mt-4">
                  <h4 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Issues</h4>
                  <div className="space-y-2">
                    {result.metrics.issues.map((issue, index) => (
                      <div key={index} className="flex items-start p-2 bg-gray-50 rounded dark:bg-gray-700">
                        {getIssueIcon(issue.type)}
                        <div className="ml-2">
                          <p className="text-sm text-gray-900 dark:text-white">{issue.message}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Line {issue.line}, Column {issue.column}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!Object.keys(results).length && !isAnalyzing && (
        <div className="flex flex-col justify-center items-center p-12 bg-gray-50 rounded-lg dark:bg-gray-800">
          <DocumentIcon className="w-12 h-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">No files analyzed</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select files to begin code analysis</p>
        </div>
      )}
    </div>
  );
};

export default AnalysisTab;
