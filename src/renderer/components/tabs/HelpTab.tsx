import React from "react";
import { QuestionMarkCircleIcon, DocumentTextIcon, CogIcon } from "@heroicons/react/24/outline";

const HelpTab: React.FC = () => {
  const features = [
    {
      icon: DocumentTextIcon,
      title: "Code Analysis",
      description: "Analyze your code for complexity, potential issues, and best practices.",
    },
    {
      icon: CogIcon,
      title: "Customizable Settings",
      description: "Adjust analysis parameters and appearance settings to match your preferences.",
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Help & Documentation</h2>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Getting Started</h3>
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Welcome to Auditor Desktop Lite! This tool helps you analyze and improve your code quality. Here's how to get
          started:
        </p>
        <ol className="space-y-2 list-decimal list-inside text-gray-600 dark:text-gray-300">
          <li>Click the "Select Files" button in the Analysis tab</li>
          <li>Choose the files you want to analyze</li>
          <li>Review the analysis results and suggested improvements</li>
          <li>Adjust settings in the Settings tab to customize the analysis</li>
        </ol>
      </div>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Features</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <feature.icon className="mt-1 w-6 h-6 text-primary-600" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">{feature.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">Need More Help?</h3>
        <p className="text-gray-600 dark:text-gray-300">
          If you need additional assistance or have questions, please visit our documentation or contact support.
        </p>
      </div>
    </div>
  );
};

export default HelpTab;
