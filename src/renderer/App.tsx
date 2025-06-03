import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { useSelector } from "react-redux";
import { store } from "../store";
import { RootState } from "../store";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";

const AppContent: React.FC = () => {
  const theme = useSelector((state: RootState) => state.ui.theme);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar />
      <main
        className="flex-1 overflow-auto transition-all duration-300"
        style={{ marginLeft: "var(--sidebar-width, 4rem)" }}
      >
        <MainContent />
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
