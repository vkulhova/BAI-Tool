import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";
import ProgressInfo from "@/components/ui/ProgressInfo/ProgressInfo";
import Accordion from "@/components/ui/Accordion";
import SectionContainer from "@/components/ui/SectionContainer";
import useStage1 from "@/components/stages/Stage1/useStage1";

const Stage1 = () => {
  const {
    buttonConfig,
    allQuestions,
    isLoading,
    resp,
    isEditing,
    stageAnswers,
    handleAnswerChange,
  } = useStage1();

  const renderCategory = (category, categoryIndex) => (
    <div key={category.categoryTitle} className="mb-6 last:mb-0">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        {category.categoryTitle}
      </h4>
      <div className="space-y-3">
        {category.questions.map((question, questionIndex) => {
          const questionId = `${categoryIndex}-${questionIndex}`;
          return (
            <Accordion
              key={questionId}
              question={question}
              answer={stageAnswers[questionId]?.answer}
              initialIsSkipped={stageAnswers[questionId]?.isSkipped}
              onAnswerChange={(answer, isSkipped) =>
                handleAnswerChange(questionId, answer, isSkipped)
              }
              readOnly={!isEditing}
            />
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12 flex-1">
          <LoadingSpinner />
        </div>
      );
    }

    if (!resp || resp.length === 0) {
      return (
        <div className="flex-1">
          <SectionContainer
            icon="⚠️"
            title="Немає питань"
            description="Питання для аналізу ще не згенеровані. Перевірте початкові дані."
            gradient="from-yellow-500 to-orange-600"
          ></SectionContainer>
        </div>
      );
    }

    return (
      <div className="space-y-6 flex-1">
        <SectionContainer
          icon="📋"
          title="Аналіз бізнес-вимог"
          description={
            isEditing
              ? "Збір та уточнення основних вимог до системи"
              : "Переглядайте ваші відповіді (режим тільки для читання)"
          }
          gradient="from-orange-300 to-orange-500 dark:from-indigo-500 dark:to-indigo-600"
        >
          {resp.map((category, categoryIndex) =>
            renderCategory(category, categoryIndex)
          )}
        </SectionContainer>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-darkOrange dark:text-violet font-bold">
          Етап 1
        </h2>
      </div>
      <div className="flex space-x-4">
        {renderContent()}
        <div className="sticky h-fit flex flex-col space-y-3 top-4">
          {allQuestions.length > 0 && (
            <ProgressInfo
              title={"Прогрес Етапу 1"}
              allQuestions={allQuestions}
              resp={resp}
              answers={stageAnswers}
              stage={"stage1"}
            />
          )}
          {allQuestions.length > 0 && (
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

export default Stage1;
