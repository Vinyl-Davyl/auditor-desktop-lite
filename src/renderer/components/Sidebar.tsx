import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleSidebar, setActiveTab } from "../../store/slices/uiSlice";
import {
  DocumentTextIcon,
  CogIcon,
  QuestionMarkCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOpen, activeTab, theme } = useSelector((state: RootState) => state.ui);

  const menuItems = [
    { id: "analysis", icon: DocumentTextIcon, label: "Code Analysis" },
    { id: "settings", icon: CogIcon, label: "Settings" },
    { id: "help", icon: QuestionMarkCircleIcon, label: "Help" },
  ];

  return (
    <div
      className={`h-full bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        sidebarOpen ? "w-64" : "w-16"
      }`}
      style={
        {
          "--sidebar-width": sidebarOpen ? "16rem" : "4rem",
        } as React.CSSProperties
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          {sidebarOpen && <h1 className="text-xl font-bold text-gray-800 dark:text-white">Auditor Desktop</h1>}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {sidebarOpen ? <ChevronLeftIcon className="w-6 h-6" /> : <ChevronRightIcon className="w-6 h-6" />}
          </button>
        </div>

        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => dispatch(setActiveTab(item.id as "analysis" | "settings" | "help"))}
              className={`flex items-center w-full p-3 mb-2 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                  : "text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {sidebarOpen && <span className="ml-3">{item.label}</span>}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
