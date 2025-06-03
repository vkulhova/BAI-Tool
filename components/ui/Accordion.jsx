"use client";
import { useEffect, useState } from "react";
const Accordion = ({
  question,
  answer,
  onAnswerChange,
  initialIsSkipped,
  readOnly = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSkipped, setIsSkipped] = useState(initialIsSkipped);

  const handleSkip = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSkipped((prev) => !prev);
  };

  useEffect(() => {
    onAnswerChange("", isSkipped);
  }, [isSkipped]);

  return (
    <div className="rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <div
        className={`w-full px-5 py-4 text-left outline-none transition-all duration-300 border-l-4 ${
          readOnly
            ? "bg-gray-50 dark:bg-gray-700/30 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600/40"
            : "bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 border-orange-300 hover:border-orange-500 dark:border-violet-400 dark:hover:border-violet-500"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className="flex justify-between items-center">
          <span className="text-base font-medium text-gray-800 dark:text-gray-200 pr-4">
            {question}
          </span>
          <div className="flex items-center space-x-3">
            {!readOnly && (
              <span
                className="text-xs px-2 cursor-pointer py-1 bg-orange-500 dark:bg-violet rounded-md text-white font-medium"
                onClick={handleSkip}
              >
                {isSkipped ? "Відповісти" : "Пропустити"}
              </span>
            )}

            {(readOnly || isSkipped) && (
              <span className="text-xs px-2 py-1 bg-gray-200/80 dark:bg-gray-600/80 rounded-md text-gray-500 dark:text-gray-400 font-medium">
                Перегляд
              </span>
            )}
            <div className="flex-shrink-0">
              <svg
                className={`w-5 h-5 transition-transform duration-300 ${
                  readOnly
                    ? "text-gray-400 dark:text-gray-500"
                    : "text-orange-500 dark:text-violet-400"
                } ${isOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="px-5 py-4 bg-white dark:bg-gray-600/30 border-t border-gray-200/50 dark:border-gray-500/30">
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {readOnly || isSkipped
                ? "Збережена відповідь:"
                : "Ваша відповідь:"}
            </label>
            {readOnly || isSkipped ? (
              <div className="w-full p-4 border-2 border-gray-200 dark:border-gray-500/50 rounded-lg bg-gray-50 dark:bg-gray-700/30 text-gray-800 dark:text-gray-200 min-h-[120px] text-base leading-relaxed">
                {answer || (
                  <span className="text-gray-400 dark:text-gray-500 italic">
                    Відповідь не надана
                  </span>
                )}
              </div>
            ) : (
              <textarea
                className="w-full overflow-auto scrollbar scrollbarSmall p-4 outline-none border-2 focus:border-orange dark:focus:border-violet border-gray-200 dark:border-gray-500/50 rounded-lg bg-white dark:bg-gray-700/50 text-gray-800 dark:text-gray-200 resize-vertical min-h-[120px] text-base leading-relaxed placeholder-gray-400 dark:placeholder-gray-500 transition-colors transition-shadow duration-200 shadow-sm"
                placeholder="Введіть вашу відповідь тут..."
                value={answer || ""}
                onChange={(e) => onAnswerChange(e.target.value, isSkipped)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
