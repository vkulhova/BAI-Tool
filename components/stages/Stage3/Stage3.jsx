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
                    answer={stageAnswers[questionId]?.answer}
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
