"use client";

import { useStageStatusStore } from "@/store/stageStatusStore";

const Timeline = ({ stages }) => {
  const stageKeys = Object.keys(stages);

  const selectedStage = useStageStatusStore((state) => state.selectedStage);
  const setSelectedStage = useStageStatusStore(
    (state) => state.setSelectedStage
  );

  const isStageAccessible = useStageStatusStore(
    (state) => state.isStageAccessible
  );
  const stageCompletion = useStageStatusStore((state) => state.stageCompletion);

  const getStageStatus = (stageKey) => {
    const isCompleted = stageCompletion[stageKey];
    const isSelected = selectedStage === stageKey;
    const isAccessible = isStageAccessible(stageKey);

    return { isCompleted, isSelected, isAccessible };
  };

  const getStageIcon = (stageKey) => {
    const icons = {
      stage1: "📋",
      stage2: "🔍",
      stage3: "📊",
      stage4: "📝",
    };
    return icons[stageKey] || "⭕";
  };

  const getStageColors = (status) => {
    if (status.isCompleted) {
      return {
        circle: "bg-emerald-500 text-white border-2 border-emerald-500",
        text: "text-emerald-600 dark:text-emerald-400",
        icon: "text-white",
      };
    } else if (status.isSelected) {
      return {
        circle:
          "bg-orange-500 dark:bg-violet-500 text-white border-2 border-orange-500 dark:border-violet-500",
        text: "text-orange-500 dark:text-violet-400",
        icon: "text-white",
      };
    } else if (status.isAccessible) {
      return {
        circle:
          "bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 hover:border-orange-500 dark:hover:border-violet-500",
        text: "text-slate-700 dark:text-slate-300",
        icon: "text-slate-600 dark:text-slate-400",
      };
    } else {
      return {
        circle:
          "bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600",
        text: "text-slate-400 dark:text-slate-500",
        icon: "text-slate-400 dark:text-slate-500",
      };
    }
  };

  const handleStageClick = (stageKey, status) => {
    if (status.isAccessible) {
      setSelectedStage(stageKey);
    }
  };

  const getLineStatus = (currentIndex) => {
    const currentStage = stageKeys[currentIndex];
    const nextStage = stageKeys[currentIndex + 1];
    const currentCompleted = stageCompletion[currentStage];
    const currentSelected = selectedStage === currentStage;
    const nextSelected = selectedStage === nextStage;

    return {
      isCompleted: currentCompleted,
      isCurrentSelected: currentSelected,
      isNextSelected: nextSelected,
    };
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="relative">
        <div className="hidden md:block">
          <div className="flex justify-between items-start relative">
            {stageKeys.map((stageKey, index) => {
              const status = getStageStatus(stageKey);
              const colors = getStageColors(status);
              const isClickable = status.isAccessible;
              const isLast = index === stageKeys.length - 1;

              return (
                <div
                  key={stageKey}
                  className="flex flex-col items-center relative flex-1"
                >
                  <div className="relative z-10 mb-6">
                    <button
                      onClick={() => handleStageClick(stageKey, status)}
                      disabled={!isClickable}
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center 
                        transition-all duration-300 
                        ${colors.circle}
                        ${
                          isClickable
                            ? "cursor-pointer hover:scale-105 hover:shadow-lg"
                            : "cursor-not-allowed"
                        }
                        outline-none
                        shadow-sm
                      `}
                      title={
                        !isClickable
                          ? "Завершіть попередній етап"
                          : stages[stageKey].title
                      }
                    >
                      {status.isCompleted ? (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <span className={`text-xl ${colors.icon}`}>
                          {getStageIcon(stageKey)}
                        </span>
                      )}
                    </button>
                  </div>

                  <div
                    className={`text-sm font-medium transition-all duration-200 ${colors.text} text-center`}
                  >
                    {stages[stageKey].title}
                  </div>

                  {!isLast && (
                    <div
                      className="absolute top-6 left-1/2 w-full h-1 z-0"
                      style={{ transform: "translateY(-50%)" }}
                    >
                      <div className="ml-6 mr-6 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        {(() => {
                          const lineStatus = getLineStatus(index);
                          let lineColor = "bg-slate-200 dark:bg-slate-700";

                          if (lineStatus.isCompleted) {
                            if (
                              lineStatus.isCurrentSelected ||
                              lineStatus.isNextSelected
                            ) {
                              lineColor =
                                lineStatus.isCurrentSelected &&
                                lineStatus.isNextSelected
                                  ? "bg-violet-500"
                                  : lineStatus.isCurrentSelected
                                  ? "bg-gradient-to-r from-orange-500 dark:from-violet-500 to-emerald-500"
                                  : "bg-gradient-to-r from-emerald-500 to-orange-500 dark:to-violet-500";
                            } else {
                              lineColor = "bg-emerald-500";
                            }
                          }

                          return (
                            <div
                              className={`h-full transition-all duration-500 ease-out ${
                                lineStatus.isCompleted ? lineColor : "w-0"
                              } ${lineStatus.isCompleted ? "w-full" : ""}`}
                            />
                          );
                        })()}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
