import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Button from "@/components/ui/Button";

import SectionContainer from "@/components/ui/SectionContainer";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";
import useStage2 from "./useStage2";

const SummarizedContent = ({ resp }) => {
  const [questions, cases, modules, typicalSystemUsers] = resp;

  const renderQuestionsList = (questions) => {
    if (!questions || questions.length === 0) return null;

    return (
      <div className="space-y-2 ml-4">
        {questions.map((question, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {question}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderWhoSection = (whoData) => {
    if (!whoData || whoData.length === 0) return null;

    return (
      <div className="space-y-2 ml-4">
        {whoData.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {`${item.user}: ${item.goal}`}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderQuestionsSection = (questions) => (
    <div className="bg-beige/60 dark:bg-black1/60 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Класифікація зібраної інформації
        </h4>
        <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full mt-1"></div>
      </div>

      <div className="space-y-4">
        {questions?.what && (
          <div>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              ❓ Що хочуть (Очікуване рішення)
            </h5>
            {renderQuestionsList(questions.what)}
          </div>
        )}
        {questions?.why && (
          <div>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              💡 Чому це потрібно (Проблеми та цілі)
            </h5>
            {renderQuestionsList(questions.why)}
          </div>
        )}
        {questions?.who && (
          <div>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              👥 Для кого і навіщо (Цільова аудиторія та цінність)
            </h5>
            {renderWhoSection(questions.who)}
          </div>
        )}
      </div>
    </div>
  );

  const renderCasesSection = (cases) => (
    <div className="bg-beige/60 dark:bg-black1/60 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Випадки використання та вимоги
        </h4>
        <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mt-1"></div>
      </div>

      <div className="space-y-4">
        {cases?.cases?.map((caseItem, index) => (
          <div key={index}>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              📋 {caseItem.categoryTitle}
            </h5>
            <div className="space-y-2 ml-4">
              {caseItem.cases?.map((caseText, textIndex) => (
                <div key={textIndex} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {caseText}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderModulesSection = (modules) => (
    <div className="bg-beige/60 dark:bg-black1/60 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Системні модулі
        </h4>
        <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mt-1"></div>
      </div>

      <div className="space-y-4">
        {modules?.modules?.map((module, index) => (
          <div key={index}>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              🔧 {module.moduleTitle}
            </h5>
            <div className="space-y-2 ml-4">
              {module.functions?.map((func, funcIndex) => (
                <div key={funcIndex} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {func}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderUserSection = (users) => (
    <div className="bg-beige/60 dark:bg-black1/60 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">
          Типові користувачі системи
        </h4>
        <div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mt-1"></div>
      </div>

      <div className="space-y-4">
        {users?.typicalSystemUsers?.map((user) => (
          <div key={user.userName}>
            <h5 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              {user.userName}
            </h5>
            {Object.keys(user).map((key) => {
              const sectionTitles = {
                userGoals: "Цілі користувача",
                userFeatures: "Особливості користувача",
                flowScenarios: "Сценарії використання",
              };
              if (typeof user[key] == "object") {
                return (
                  <div key={key}>
                    <h6 className="text-md text-gray-700 dark:text-gray-300 mb-2">
                      {sectionTitles[key]}
                    </h6>
                    <div className="space-y-2 ml-4">
                      {user.userGoals?.map((goal) => (
                        <div key={goal} className="flex items-start space-x-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-2 flex-shrink-0"></div>
                          <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                            {goal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
              return;
            })}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <SectionContainer
      icon="🔍"
      title="Структурований аналіз"
      description="Результати обробки та структурування вимог з Етапу 1"
      gradient="from-orange-300 to-orange-500 dark:from-indigo-500 dark:to-indigo-600"
    >
      <div className="grid gap-8">
        {renderQuestionsSection(questions)}
        {renderCasesSection(cases)}
        {renderModulesSection(modules)}
        {renderUserSection(typicalSystemUsers)}
      </div>
    </SectionContainer>
  );
};

const Stage2 = () => {
  const { buttonConfig, resp, isLoading, isSummarized, getFormattedQA } =
    useStage2();

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-darkOrange dark:text-violet font-bold">
          Етап 2
        </h2>
        {buttonConfig && (
          <Button onClick={buttonConfig.onClick} variant={buttonConfig.variant}>
            {buttonConfig.text}
          </Button>
        )}
      </div>

      <div className="space-y-8">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {isSummarized && !isLoading && resp.length !== 0 && (
          <>
            <SummarizedContent resp={resp} />
            <ScrollToTopButton />
          </>
        )}

        {!isLoading && resp.length === 0 && getFormattedQA().length === 0 && (
          <SectionContainer
            icon="⚠️"
            title="Немає даних з Етапу 1"
            description="Для продовження спочатку завершіть Етап 1"
            gradient="from-yellow-500 to-orange-600"
          ></SectionContainer>
        )}
      </div>
    </div>
  );
};

export default Stage2;
