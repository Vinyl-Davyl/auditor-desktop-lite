import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AnalysisTab from "./tabs/AnalysisTab";
import SettingsTab from "./tabs/SettingsTab";
import HelpTab from "./tabs/HelpTab";

const MainContent: React.FC = () => {
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  const renderContent = () => {
    switch (activeTab) {
      case "analysis":
        return <AnalysisTab />;
      case "settings":
        return <SettingsTab />;
      case "help":
        return <HelpTab />;
      default:
        return <AnalysisTab />;
    }
  };

  return <div className="p-6">{renderContent()}</div>;
};

export default MainContent;
