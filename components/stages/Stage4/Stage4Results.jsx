import { generatePDF } from "./utils/pdfGenerator";

const Stage4Results = ({ resp }) => {
  if (!resp || resp.length === 0) return null;

  const srsData = {
    intro: resp[0]?.intro || {},
    abstract: resp[1].abstract || "",
    users: resp[2]?.users || [],
    limitsAndAssumptions: resp[3]?.limitsAndAssumptions || {},
    functionality: resp[4]?.functionality || [],
    modules: resp[5]?.modules || [],
    nonFunctional: resp[6]?.nonFunctional || {},
    useCases: resp[7]?.useCase || [],
    dataModel: resp[8]?.erd || [],
    businessProcesses: resp[9]?.businessProcesses || [],
    prioritization: resp[10]?.mscv || {},
    mvpTasks: resp[11]?.mvp || [],
    testingPurpose: resp[12].testingPurpose || "",
    testCases: resp[13].testCases || [],
  };

  console.log(srsData.testCases);

  const renderFunctionalRequirements = () => {
    const functional = srsData.functionality;
    const modules = srsData.modules;
    return (
      <div className="space-y-5">
        <h3
          id="system-functionality"
          className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
        >
          3.1 Опис функціональності системи
        </h3>
        {functional.map((category, index) => (
          <div key={index}>
            <div
              key={category.funcGroupTitle}
              className="flex items-start space-x-3"
            >
              <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-3 flex-shrink-0"></div>
              <h4 className="text-lg font-semibold text-orange-400 dark:text-violet-400">
                {category.funcGroupTitle}

                <span className="text-gray-700 text-base dark:text-gray-300">
                  {" - "}
                  {category.funcGroupDesc}
                </span>
              </h4>
            </div>
            <p className="text-gray-700 font-semibold dark:text-gray-300 ml-5">
              Основні функції:
            </p>
            <ul className="text-gray-700 text-base ml-5 list-disc list-inside dark:text-gray-300">
              {category.keyFunctions.map((func) => (
                <li key={func}>{func}</li>
              ))}
            </ul>
          </div>
        ))}

        <h3
          id="modules"
          className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
        >
          3.2 Перелік логічних груп і модулів
        </h3>
        {modules.map((mod, index) => (
          <div key={index}>
            <div key={mod.moduleTitle} className="flex items-start space-x-3">
              <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-3 flex-shrink-0"></div>
              <h4 className="text-lg font-semibold text-orange-400 dark:text-violet-400">
                {mod.moduleTitle}

                <span className="text-gray-700 text-base dark:text-gray-300">
                  {" - "}
                  {mod.moduleDesc}
                </span>
              </h4>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNonFunctionalRequirements = () => {
    const categories = [
      {
        key: "productivity",
        id: "system-productivity",
        title: "Вимоги до продуктивності системи",
      },
      {
        key: "security",
        id: "system-security",
        title: "Безпекові вимоги",
      },
      {
        key: "resilience",
        id: "system-resilience",
        title: "Вимоги до відмовостійкості системи",
      },
      {
        key: "scalability",
        id: "system-scalability",
        title: "Вимоги до масштабованості системи",
      },
    ];

    return (
      <div className="space-y-6">
        {categories.map((category) => {
          const items = srsData.nonFunctional[category.key] || [];
          return (
            <div key={category.key}>
              <h4
                id={category.id}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                4.{categories.indexOf(category) + 1} {category.title}
              </h4>
              <ul className="space-y-2 ml-4">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  const renderUseCases = () => {
    return (
      <div className="space-y-6">
        {srsData.useCases.map((actorGroup, actorIndex) => (
          <div key={actorIndex}>
            <h4 className="text-lg font-semibold text-orange-400 dark:text-violet-400 mb-3">
              {actorGroup.actor}
            </h4>
            <ul className="space-y-2 ml-4">
              {actorGroup.useCases.map((useCase, useCaseIndex) => (
                <li key={useCaseIndex} className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    <span className="font-medium text-orange-400 dark:text-violet-400">
                      UC{actorIndex + 1}.{useCaseIndex + 1}:
                    </span>{" "}
                    {useCase}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  const renderDataModel = () => {
    return (
      <div className="space-y-6">
        {srsData.dataModel.map((entity, index) => (
          <div
            key={index}
            className="bg-beige/40 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30"
          >
            <div className="flex items-center space-x-3 mb-4">
              <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                {entity.entityName}
              </h4>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="text-sm font-semibold text-orange-400 dark:text-violet-400 mb-3 uppercase tracking-wide">
                  Поля (Attributes)
                </h5>
                <div className="space-y-2">
                  {entity.entityFields.map((field, fieldIndex) => (
                    <div
                      key={fieldIndex}
                      className="flex items-center space-x-2 p-2 bg-beige/30 dark:bg-black1/30 rounded"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500"></div>
                      <code className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                        {field}
                      </code>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-orange-400 dark:text-violet-400 mb-3 uppercase tracking-wide">
                  Зв'язки (Relationships)
                </h5>
                <div className="space-y-2">
                  {entity.entityConnections.map((connection, connIndex) => (
                    <div
                      key={connIndex}
                      className="p-3 bg-beige/30 dark:bg-black1/30 rounded border-l-4 border-orange-500"
                    >
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {connection}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderMoSCoW = () => {
    const categories = [
      { key: "mustHave", title: "MUST HAVE", subtitle: "Обов'язкові вимоги" },
      { key: "shouldHave", title: "SHOULD HAVE", subtitle: "Важливі вимоги" },
      { key: "couldHave", title: "COULD HAVE", subtitle: "Бажані вимоги" },
      { key: "wontHave", title: "WON'T HAVE", subtitle: "Відкладені вимоги" },
    ];

    return (
      <div className="space-y-6">
        {categories.map((category) => {
          const items = srsData.prioritization[category.key] || [];
          return (
            <div key={category.key}>
              <h4 className="text-lg font-semibold text-orange-400 dark:text-violet-400 mb-2">
                {category.title} - {category.subtitle}
              </h4>
              <ul className="space-y-2 ml-4">
                {items.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-beige2/95 dark:bg-black2/95 backdrop-blur-sm rounded-2xl p-6 border border-borderGray2/50 dark:border-borderGray/50 shadow-xl overflow-hidden">
      <div id="srs-content" className="relative">
        <button
          onClick={generatePDF}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-600 hover:bg-white dark:hover:bg-gray-800 transition-all duration-200 flex items-center justify-center group shadow-sm hover:shadow-md"
          title="Завантажити PDF"
        >
          <svg
            className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>

        {/* Титульна сторінка */}
        <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-violet-900/20 dark:via-purple-900/20 dark:to-indigo-900/20 p-12 text-center border-b border-borderGray2/50 dark:border-borderGray/50">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 leading-tight">
              SOFTWARE REQUIREMENTS SPECIFICATION
            </h1>

            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-500 dark:from-violet-500 dark:to-purple-600 mx-auto mb-6 rounded-full"></div>

            <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-8 font-medium">
              Технічна специфікація вимог до програмного забезпечення
            </h2>

            <div className="bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-orange-500 dark:text-violet-400 font-semibold mb-1">
                    Версія документу
                  </div>
                  <div className="text-gray-700 dark:text-gray-300 font-mono">
                    v1.0.0
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-orange-500 dark:text-violet-400 font-semibold mb-1">
                    Дата створення
                  </div>
                  <div className="text-gray-700 dark:text-gray-300">
                    {new Date().toLocaleDateString("uk-UA")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Зміст документу */}
        <div className="p-8 lg:p-12">
          {/* Зміст */}
          <section className="mb-12 scroll-mt-8">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">📑</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  ЗМІСТ
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Навігація по документу
                </p>
              </div>
            </div>

            <div className="bg-beige/40 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              <div className="space-y-2">
                <a
                  href="#introduction"
                  className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                >
                  1. Вступ
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#document-purpose"
                    >
                      1.1 Призначення документа
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#system-scope"
                    >
                      1.2 Область застосування системи
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#definitions"
                    >
                      1.3 Визначення, акроніми, скорочення
                    </a>
                  </li>
                </ul>
                <a
                  href="#system-overview"
                  className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                >
                  2. Загальний опис системи
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#product-overview"
                    >
                      2.1 Опис продукту
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#group-of-users"
                    >
                      2.2 Основні групи користувачів та їхні потреби
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#limitations"
                    >
                      2.3 Обмеження та припущення, що можуть вплинути на систему
                    </a>
                  </li>
                </ul>
                <a
                  href="#functional-requirements"
                  className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                >
                  3. Функціональні вимоги
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#system-functionality"
                    >
                      3.1 Опис функціональності системи
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#modules"
                    >
                      3.2 Перелік логічних груп і модулів
                    </a>
                  </li>
                </ul>
                <a
                  href="#non-functional-requirements"
                  className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                >
                  4. Нефункціональні вимоги
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#system-productivity"
                    >
                      4.1 Вимоги до продуктивності системи
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#system-security"
                    >
                      4.2 Безпекові вимоги
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#system-resilience"
                    >
                      4.3 Вимоги до відмовостійкості системи
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#system-scalability"
                    >
                      4.4 Вимоги до масштабованості системи
                    </a>
                  </li>
                </ul>
                <a
                  href="#another-requirements"
                  className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                >
                  5. Інші вимоги
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#use-case"
                    >
                      5.1 Use Case Diagram
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#er-diagram"
                    >
                      5.2 ER-Diagram
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#business-processes"
                    >
                      5.3 Опис бізнес-процесів
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#prioritization"
                    >
                      5.4 Пріоритети за MSCW
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#mvp"
                    >
                      5.5 Завдання для MVP
                    </a>
                  </li>
                </ul>
                <a
                  href="#system-testing"
                  className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                >
                  6. Тестування системи
                </a>
                <ul className="ml-4 space-y-1">
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#testing-purpose"
                    >
                      6.1 Мета тестування
                    </a>
                  </li>
                  <li>
                    <a
                      className="block text-orange-500 dark:text-violet-400 hover:text-orange-700 dark:hover:text-violet-300 transition-colors"
                      href="#test-cases"
                    >
                      6.2 Сценарії тестування
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 1. Вступ */}
          <section id="introduction" className="mb-12 scroll-mt-8">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Вступ
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Загальна інформація про документ та проєкт
                </p>
              </div>
            </div>

            <div className="bg-beige/40 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              <div className="space-y-4">
                <div>
                  <h3
                    id="document-purpose"
                    className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
                  >
                    1.1 Призначення документа
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {srsData.intro.purpose}
                  </p>
                </div>
                <div>
                  <h3
                    id="system-scope"
                    className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
                  >
                    1.2 Область застосування системи
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {srsData.intro.scope}
                  </p>
                </div>
                <div>
                  <h3
                    id="definitions"
                    className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
                  >
                    1.3 Визначення, акроніми, скорочення
                  </h3>
                  <ul className="list-disc list-inside space-y-2">
                    {" "}
                    {srsData.intro.definitions.map((def) => (
                      <li
                        className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        key={def}
                      >
                        {def}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Загальний опис системи */}
          <section id="system-overview" className="mb-12 scroll-mt-8">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Загальний опис системи
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Огляд функціональності та користувачів
                </p>
              </div>
            </div>

            <div className="bg-beige/40 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              <div className="space-y-4">
                <div>
                  <h3
                    id="product-overview"
                    className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
                  >
                    2.1 Опис продукту
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {srsData.abstract}
                  </p>
                </div>

                <div>
                  <h3
                    id="group-of-users"
                    className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
                  >
                    2.2 Основні групи користувачів та їхні потреби
                  </h3>
                  <div className="space-y-4">
                    {srsData.users.map((user) => (
                      <div
                        key={user.userName}
                        className="text-gray-700 dark:text-gray-300 space-y-1"
                      >
                        <h4 className="text-lg text-orange-400 dark:text-violet-400">{user.userName}</h4>
                        <p>{user.userDescription}</p>
                        <p>Цінність: {user.value}</p>
                        <p>Потреби:</p>
                        <ul className=" list-disc list-inside pl-4">
                          {user.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3
                    id="limitations"
                    className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
                  >
                    2.3 Обмеження та припущення, що можуть вплинути на систему
                  </h3>
                  <h4 className=" text-gray-700 dark:text-gray-300 text-lg">
                    Обмеження
                  </h4>
                  <ul className=" list-disc list-inside pl-4">
                    {srsData.limitsAndAssumptions.limitations.map(
                      (limitation) => (
                        <li
                          key={limitation}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        >
                          {limitation}
                        </li>
                      )
                    )}
                  </ul>
                  <h4 className="text-gray-700 mt-2 dark:text-gray-300 text-lg">
                    Припущення
                  </h4>
                  <ul className=" list-disc list-inside pl-4">
                    {srsData.limitsAndAssumptions.assumptions.map(
                      (assumption) => (
                        <li
                          key={assumption}
                          className="text-gray-700 dark:text-gray-300 leading-relaxed"
                        >
                          {assumption}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Функціональні вимоги */}
          <section id="functional-requirements" className="mb-12 scroll-mt-8">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Функціональні вимоги
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Детальний опис функцій системи
                </p>
              </div>
            </div>

            <div className="bg-beige/40 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              {renderFunctionalRequirements()}
            </div>
          </section>

          {/* 4. Нефункціональні вимоги */}
          <section
            id="non-functional-requirements"
            className="mb-12 scroll-mt-8"
          >
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">4</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Нефункціональні вимоги
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Якість, продуктивність та обмеження
                </p>
              </div>
            </div>

            <div className="bg-beige/40 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              {renderNonFunctionalRequirements()}
            </div>
          </section>

          {/* 5. Варіанти використання */}
          <section id="another-requirements" className="mb-12 scroll-mt-8">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">5</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Інші вимоги
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Use Cases Diagram, ER-Diagram, MSCW та MVP
                </p>
              </div>
            </div>

            <div className="bg-beige/40 space-y-6 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              <h3
                id={"use-case"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                5.1 Use Case Diagram
              </h3>
              {renderUseCases()}
              <h3
                id={"er-diagram"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                5.2 ER-Diagram
              </h3>
              {renderDataModel()}

              <h3
                id={"business-processes"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                5.3 Опис бізнес-процесів
              </h3>
              <div className=" space-y-3">
                {srsData.businessProcesses.map((process) => (
                  <div key={process.processName}>
                    <h4 className="text-lg font-semibold text-orange-400 dark:text-violet-400 mb-2">
                      {process.processName}
                    </h4>
                    <p className="text-gray-700 mb-1.5 dark:text-gray-300">
                      {process.processDescription}
                    </p>
                    <p className="text-gray-700 mb-1.5 font-semibold dark:text-gray-300">
                      Користувачі процесу:
                    </p>
                    <ul className="space-y-2 ml-4">
                      {process.processUsers.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <h3
                id={"prioritization"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                5.4 Пріоритети за MSCW
              </h3>
              {renderMoSCoW()}

              <h3
                id={"mvp"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                5.5 Завдання для MVP
              </h3>
              <div className="space-y-2">
                {srsData.mvpTasks.map((task, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      <span className="font-medium text-orange-400 dark:text-violet-400">
                        {index + 1}.
                      </span>{" "}
                      {task}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="system-testing" className="mb-12 scroll-mt-8">
            <div className="flex items-center space-x-4 mb-6 pb-4 border-b-2 border-orange-200 dark:border-violet-500/90">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-300 to-orange-500 dark:from-violet-500 dark:to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">6</span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                  Тестування системи
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Опис сценаріїв тестування
                </p>
              </div>
            </div>

            <div className="bg-beige/40 space-y-6 dark:bg-black1/40 rounded-xl p-6 border border-borderGray2/30 dark:border-borderGray/30">
              <h3
                id={"testing-purpose"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                6.1 Мета тестування
              </h3>
              <p className="text-gray-700 mb-5 dark:text-gray-300">
                {srsData.testingPurpose}
              </p>

              <h3
                id={"test-cases"}
                className="text-xl font-semibold text-orange-400 dark:text-violet-400 mb-2"
              >
                6.2 Сценарії тестування
              </h3>
              <div className=" space-y-3">
                {srsData.testCases.map((testCase) => (
                  <div key={testCase.title}>
                    <h4 className="text-lg font-semibold text-orange-400 dark:text-violet-400 mb-2">
                      {testCase.title}
                    </h4>
                    <p className="text-gray-700 mb-1.5 dark:text-gray-300">
                      <span className="font-semibold">Ціль тестування:</span>{" "}
                      {testCase.purpose}
                    </p>
                    <p className="text-gray-700 mb-1.5 dark:text-gray-300">
                      <span className="font-semibold">Попередні умови:</span>{" "}
                      {testCase.prerequisites}
                    </p>
                    <p className="text-gray-700 mb-1.5 dark:text-gray-300">
                      <span className="font-semibold">
                        Очікуваний результат:
                      </span>{" "}
                      {testCase.expectedResult}
                    </p>
                    <p className="text-gray-700 mb-1.5 font-semibold dark:text-gray-300">
                      Кроки тестування
                    </p>
                    <ul className="space-y-2 ml-4">
                      {testCase.steps.map((item, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 rounded-full bg-orange-400 dark:bg-violet-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Stage4Results;
