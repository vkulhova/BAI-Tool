import React from "react";

const ProgressBar = ({
  percentage = 0,
  size = "sm",
  showLabel = false,
  labelText = "Прогрес",
  className = "",
}) => {
  const sizes = {
    xs: "h-1",
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const progressSize = sizes[size] || sizes.sm;

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">{labelText}</span>
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`${progressSize} bg-beige2/80 dark:bg-black2/80 rounded-full overflow-hidden`}
      >
        <div
          className={`h-full bg-gradient-to-r from-orange-300 to-orange-500 dark:from-blue-500 dark:to-blue-600 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, percentage))}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
