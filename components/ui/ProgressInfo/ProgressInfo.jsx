import React from "react";
import ProgressBar from "@/components/ui/ProgressBar";
import useProgressInfo from "@/components/ui/ProgressInfo/useProgressInfo";

const ProgressInfo = ({ title, allQuestions, answers, resp, stage }) => {
  const { isEditing, categoryProgress, progressPercentage } = useProgressInfo({
    allQuestions,
    answers,
    resp,
    stage,
  });

  return (
    <div className="w-80  bg-beige2/95 dark:bg-black2/95 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-xl h-fit">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-300 to-orange-500 dark:from-blue-500 dark:to-blue-600 rounded-xl mb-3 shadow-lg">
          <span className="text-white text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-orange-300 to-orange-500 dark:from-blue-500 dark:to-blue-600 bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {isEditing ? "Режим редагування" : "Режим перегляду"}
        </p>
      </div>

      <div className="space-y-4 mb-6 max-h-[50vh] overflow-auto scrollbar scrollbarSmall">
        {categoryProgress.map((category, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="relative z-10">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  category.completed
                    ? "bg-gradient-to-r from-orange-300 to-orange-500 dark:from-blue-500 dark:to-blue-600 border-orange-300 dark:border-blue-500"
                    : category.current
                    ? "bg-beige dark:bg-black1 border-orange-300 dark:border-blue-500"
                    : "bg-beige2 dark:bg-black2 border-borderGray2 dark:border-borderGray"
                }`}
              >
                {category.completed ? (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : category.current ? (
                  <div className="w-2 h-2 bg-orange-300 dark:bg-blue-500 rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                )}
              </div>
              {index < categoryProgress.length - 1 && (
                <div
                  className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-14 transition-all duration-300 ${
                    category.completed
                      ? "bg-gradient-to-b from-orange-300 to-orange-500 dark:from-blue-500 dark:to-blue-600"
                      : "bg-borderGray2 dark:bg-borderGray"
                  }`}
                ></div>
              )}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div
                className={`text-sm font-medium transition-all duration-300 ${
                  category.completed
                    ? "text-orange-600 dark:text-blue-400"
                    : category.current
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400"
                }`}
              >
                {category.title}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {Math.round(category.progress)}% завершено
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-borderGray2 dark:border-borderGray">
        <ProgressBar
          percentage={progressPercentage}
          variant="blue"
          showLabel={true}
          labelText="Загальний прогрес"
        />
        {progressPercentage === 100 && (
          <div className="flex items-center justify-center mt-3 text-green-600 dark:text-green-400">
            <span className="text-lg mr-2">🎉</span>
            <span className="text-sm font-medium">Готово!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressInfo;
