import { motion } from "framer-motion";
import { Check } from "lucide-react";
import React from "react";

const StepIndicator = ({ stepLabels, step }) => {
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {stepLabels.map((label, i) => (
        <React.Fragment key={i}>
          <div  className="flex flex-col items-center gap-1.5">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                i <= step
                  ? "bg-accent text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500"
              }`}
            >
              {i < step ? (
                <Check className="w-4 h-4" strokeWidth={2.5} />
              ) : (
                i + 1
              )}
            </div>
            <span
              className={`text-[10px] font-medium ${
                i <= step ? "text-accent" : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {label}
            </span>
          </div>

          {/* Connector Line */}
          {i < stepLabels.length - 1 && (
            <div
              
              className={`flex-1 h-0.5 mb-4 mx-4 rounded transition-all duration-300 ${
                i < step ? "bg-accent" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;