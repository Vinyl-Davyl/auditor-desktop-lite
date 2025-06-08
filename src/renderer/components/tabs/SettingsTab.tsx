import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setTheme } from "../../../store/slices/uiSlice";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const SettingsTab: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.ui.theme);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Appearance</h3>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => dispatch(setTheme("light"))}
            className={`flex items-center px-4 py-2 rounded-lg ${
              theme === "light"
                ? "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <SunIcon className="w-5 h-5 mr-2" />
            Light
          </button>

          <button
            onClick={() => dispatch(setTheme("dark"))}
            className={`flex items-center px-4 py-2 rounded-lg ${
              theme === "dark"
                ? "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            <MoonIcon className="w-5 h-5 mr-2" />
            Dark
          </button>
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Analysis Settings</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-gray-700 dark:text-gray-300">Complexity Threshold</label>
            <input
              type="number"
              min="1"
              max="10"
              defaultValue="5"
              className="w-20 px-3 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-gray-700 dark:text-gray-300">Max File Size (MB)</label>
            <input
              type="number"
              min="1"
              max="100"
              defaultValue="10"
              className="w-20 px-3 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
