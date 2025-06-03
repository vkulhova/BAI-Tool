import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import ProgressInfo from "@/components/ui/ProgressInfo/ProgressInfo";
import Accordion from "@/components/ui/Accordion";
import SectionContainer from "@/components/ui/SectionContainer";
import useStage3 from "@/components/stages/Stage3/useStage3";

const SECTION_INFO = {
  prevDataUnderstanding: {
    title: "Попереднє розуміння даних",
    icon: "📊",
    description: "Аналіз і уточнення бізнес-потреб",
  },
  exceptAlterInterview: {
    title: "Виключення та альтернативні сценарії",
    icon: "🔄",
    description: "Обробка виняткових ситуацій та альтернатив",
  },
};

const ProgressInfoggf = ({ allQuestions, stage3Answers, isEditing }) => {
  const answeredCount = allQuestions.filter(
    (q) => stage3Answers[q.id] && stage3Answers[q.id].trim().length > 0
  ).length;
  const progressPercentage =
    allQuestions.length > 0 ? (answeredCount / allQuestions.length) * 100 : 0;

  const sections = [
    { key: "prevDataUnderstanding", title: "Розуміння даних", icon: "📊" },
    { key: "typicalSystemUsers", title: "Користувачі системи", icon: "🎭" },
    {
      key: "exceptAlterInterview",
      title: "Виключення та альтернативи",
      icon: "🔄",
    },
  ];

  const sectionProgress = sections
    .map((section) => {
      const sectionQuestions = allQuestions.filter(
        (q) => q.sectionName === section.key
      );
      const sectionAnswered = sectionQuestions.filter(
        (q) => stage3Answers[q.id] && stage3Answers[q.id].trim().length > 0
      ).length;

      return {
        ...section,
        completed:
          sectionAnswered === sectionQuestions.length &&
          sectionQuestions.length > 0,
        progress:
          sectionQuestions.length > 0
            ? (sectionAnswered / sectionQuestions.length) * 100
            : 0,
        current:
          sectionAnswered > 0 && sectionAnswered < sectionQuestions.length,
        hasQuestions: sectionQuestions.length > 0,
      };
    })
    .filter((section) => section.hasQuestions);

  return (
    <div className="w-80 bg-beige2/95 dark:bg-black2/95 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-xl h-fit sticky top-4">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl mb-3 shadow-lg">
          <span className="text-white text-2xl">📊</span>
        </div>
        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
          Прогрес Етапу 3
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {isEditing ? "Режим редагування" : "Режим перегляду"}
        </p>
        <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          {answeredCount} з {allQuestions.length} питань
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {sectionProgress.map((section, index) => (
          <div key={section.key} className="flex items-center space-x-4">
            <div className="relative z-10">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  section.completed
                    ? "bg-gradient-to-r from-purple-500 to-purple-600 border-purple-500"
                    : section.current
                    ? "bg-beige dark:bg-black1 border-purple-500"
                    : "bg-beige2 dark:bg-black2 border-borderGray2 dark:border-borderGray"
                }`}
              >
                {section.completed ? (
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
                ) : section.current ? (
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                ) : (
                  <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full"></div>
                )}
              </div>
              {index < sectionProgress.length - 1 && (
                <div
                  className={`absolute top-6 left-1/2 transform -translate-x-1/2 w-0.5 h-8 transition-all duration-300 ${
                    section.completed
                      ? "bg-gradient-to-b from-purple-500 to-purple-600"
                      : "bg-borderGray2 dark:bg-borderGray"
                  }`}
                ></div>
              )}
            </div>
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center space-x-2">
                <span className="text-sm">{section.icon}</span>
                <div
                  className={`text-sm font-medium transition-all duration-300 ${
                    section.completed
                      ? "text-purple-600 dark:text-purple-400"
                      : section.current
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {section.title}
                </div>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                {Math.round(section.progress)}% завершено
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-borderGray2 dark:border-borderGray">
        <ProgressBar
          percentage={progressPercentage}
          variant="purple"
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

const QuestionSection = ({
  sectionKey,
  sectionData,
  sectionIndex,
  stageAnswers,
  onAnswerChange,
  isEditing = true,
}) => {
  if (!sectionData || sectionData.length === 0) return null;

  const sectionInfo = SECTION_INFO[sectionKey];

  return (
    <div className="mb-8">
      <SectionContainer
        icon={sectionInfo.icon}
        title={sectionInfo.title}
        description={
          isEditing
            ? sectionInfo.description
            : `${sectionInfo.description} (режим перегляду)`
        }
        gradient="from-orange-300 to-orange-500 dark:from-indigo-500 dark:to-indigo-600"
      >
        {sectionData.map((category, categoryIndex) => (
          <div key={category.categoryTitle} className="mb-6 last:mb-0">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {category.categoryTitle}
            </h4>
            <div className="space-y-3">
              {category.questions.map((question, questionIndex) => {
                const questionId = `${sectionIndex}-${categoryIndex}-${questionIndex}`;
                return (
                  <Accordion
                    key={questionId}
                    question={question}
                    answer={stageAnswers[questionId].answer}
                    initialIsSkipped={stageAnswers[questionId]?.isSkipped}
                    onAnswerChange={(answer, isSkipped) =>
                      onAnswerChange(questionId, answer, isSkipped)
                    }
                    readOnly={!isEditing}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </SectionContainer>
    </div>
  );
};

const Stage3 = () => {
  const {
    resp,
    isLoading,
    isProcessed,
    stageAnswers,
    allQuestions,
    isEditing,
    handleAnswerChange,
    buttonConfig,
  } = useStage3();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-darkOrange dark:text-violet font-bold">
          Етап 3
        </h2>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {!isProcessed && !isLoading && (
            <SectionContainer
              icon="⚙️"
              title="Обробка даних"
              description="Обробка даних з Етапу 2 та формування уточнюючих питань..."
              gradient="from-purple-500 to-purple-600"
            ></SectionContainer>
          )}

          {isProcessed && !isLoading && resp.length !== 0 && (
            <div className="space-y-6">
              {resp.map((section, sectionIndex) => {
                const sectionKey = Object.keys(section);
                const sectionData = section[sectionKey];

                return (
                  <QuestionSection
                    key={sectionKey}
                    sectionKey={sectionKey}
                    sectionData={sectionData}
                    sectionIndex={sectionIndex}
                    stageAnswers={stageAnswers}
                    onAnswerChange={handleAnswerChange}
                    isEditing={isEditing}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="sticky h-fit flex flex-col space-y-3 top-4">
          {allQuestions.length > 0 && (
            <ProgressInfo
              title={"Прогрес Етапу 3"}
              allQuestions={allQuestions}
              resp={[
                ...resp.map((item, sectionIndex) =>
                  item[Object.keys(item)].map((category, index) => {
                    return {
                      ...category,
                      sectionIndex: sectionIndex,
                      categoryIndex: index,
                    };
                  })
                ),
              ].flat()}
              answers={stageAnswers}
              stage={"stage3"}
            />
          )}
          {buttonConfig && (
            <Button
              onClick={buttonConfig.onClick}
              disabled={buttonConfig.disabled}
              variant={buttonConfig.variant}
            >
              {buttonConfig.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stage3;
