import { Type } from "@google/genai";

// Вступ
const stage4Config1 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      intro: {
        type: Type.OBJECT,
        properties: {
          purpose: {
            type: Type.STRING,
          },
          scope: {
            type: Type.STRING,
          },
          definitions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        propertyOrdering: ["purpose", "scope", "definitions"],
      },
    },
  },
  systemInstruction: String.raw`Уяви, що ти бізнес-аналітик, який створює розділ 1 “Вступ” до документа специфікації вимог до програмного забезпечення (SRS).
Завдання: Сформулюй призначення документа — вкажи, для кого створений документ і яку частину системи він описує, область застосування системи — опиши, що робить система, які в неї основні функції, для кого вона призначена, визначення, акроніми, скорочення — наведи словник термінів, що можуть бути використані в документі (щонайменше 5 термінів).
  Формат відповіді:

    Призначення документа
    [текст]

    Область застосування системи
    [текст]

    Визначення, акроніми, скорочення
    – [термін 1]: [визначення]
    – [термін 2]: [визначення]
    ... інші терміни та визначення

  Не додавай пояснень, вступів, стилів, емоцій, маркдаунів чи побажань.
`,
};

// Опис продукту
const stage4Config2 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      abstract: {
        type: Type.STRING,
      },
    },
  },
  systemInstruction: String.raw`
    Уяви, що ти бізнес-аналітик, який створює підрозділ 2.1 "Опис продукту" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання:
    Опиши продукт, включивши:
    – загальну ідею, яку проблему вирішує продукт;
    – тип рішення (наприклад: веб-портал, мобільний додаток, мікросервіс тощо);
    – головну цінність для бізнесу та користувачів;
    – короткий перелік основних функцій, які виконує система.

    Формат відповіді:
    [текст]
    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Основні групи користувачів
const stage4Config3 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      users: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            userName: {
              type: Type.STRING,
            },
            userDescription: {
              type: Type.STRING,
            },
            requirements: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            value: {
              type: Type.STRING,
            },
          },
          propertyOrdering: [
            "userName",
            "userDescription",
            "requirements",
            "value",
          ],
        },
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який створює підрозділ 2.2 "Основні групи користувачів та їхні потреби" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: Сформулюй опис основних груп користувачів системи. Для кожної групи вкажи:
    – Назву ролі користувача
    – Короткий опис ролі в контексті системи
    – Основні потреби користувача (3–5 пунктів)
    – Мотивацію або очікувану цінність від використання системи

    Формат відповіді:
    [Назва ролі]
    Опис: [роль у системі]
    Потреби:
    – [потреба 1]
    – [потреба 2]
    – [потреба 3]
    Цінність: [очікуваний результат або вигода]

    ... інші ролі

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Обмеження
const stage4Config4 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      limitsAndAssumptions: {
        type: Type.OBJECT,
        properties: {
          limitations: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          assumptions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        propertyOrdering: ["limitations", "assumptions"],
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який створює підрозділ 2.3 "Обмеження та припущення, що можуть вплинути на систему" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: Сформулюй перелік: 
    – Обмежень, які вже відомі або встановлені в рамках проєкту (наприклад, технічні, організаційні, часові, правові).
    – Припущень, на яких базується поточне бачення системи (наприклад, гіпотези про стабільність інтеграції, обсяг трафіку, стабільну структуру ролей).

    Формат відповіді:

    Обмеження:
    – [обмеження 1]
    – [обмеження 2]
    – [обмеження 3]
    ... інші обмеження

    Припущення:
    – [припущення 1]
    – [припущення 2]
    – [припущення 3]
    ... інші припущення
    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Опис функціональності системи
const stage4Config5 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      functionality: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            funcGroupTitle: {
              type: Type.STRING,
            },
            funcGroupDesc: {
              type: Type.STRING,
            },
            keyFunctions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["funcGroupTitle", "funcGroupDesc", "keyFunctions"],
        },
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який створює розділ 3.1 "Опис функціональності системи" для документа специфікації вимог до програмного забезпечення (SRS).
  Завдання: Сформулюй структурований опис основної функціональності системи. Об’єднай функціональні вимоги в логічні групи або модулі. Для кожної групи коротко опиши, яку задачу вона вирішує та яку функціональність включає.

    Формат відповіді:

    [Назва групи функцій]
    Опис задачі: [короткий опис задачі функцій]
    Ключові функції/вимоги: 
    – [функція/вимога цього модуля]
    – [функція/вимога цього модуля]
    ... інші функції/вимоги

    ... інші модулі та функціональності
    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Перелік логічних груп і модулів
const stage4Config6 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      modules: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            moduleTitle: {
              type: Type.STRING,
            },
            moduleDesc: {
              type: Type.STRING,
            },
          },
          propertyOrdering: ["moduleTitle", "moduleDesc"],
        },
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який створює підрозділ 3.2 "Перелік логічних груп і модулів" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: Склади перелік основних логічних груп і модулів, на які поділяється функціональність системи. Для кожного модуля вкажи його назву та короткий опис його призначення або функціонального призначення.

    Формат відповіді:
    – [Назва модуля 1]: [короткий опис призначення модуля]
    – [Назва модуля 2]: [короткий опис призначення модуля]
    – [Назва модуля 3]: [короткий опис призначення модуля]
    ... інші модулі

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Нефункціональні вимоги
const stage4Config7 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      nonFunctional: {
        type: Type.OBJECT,
        properties: {
          productivity: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          security: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          resilience: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          scalability: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        propertyOrdering: [
          "productivity",
          "security",
          "resilience",
          "scalability",
        ],
      },
    },
  },
  systemInstruction: String.raw`
 Уяви, що ти бізнес-аналітик, який створює розділ 3. Нефункціональні вимоги для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: Сформулюй вимоги до:
    – Продуктивності системи (час відгуку, обсяг одночасних сесій, швидкість обробки запитів тощо)
    – Безпеки (автентифікація, права доступу, шифрування, аудит тощо)
    – Відмовостійкості (резервне копіювання, повідомлення про збої, аварійне відновлення)
    – Масштабованості (підтримка зростання обсягу даних, кількості користувачів, розширення модулів)

    Формат відповіді:

    Вимоги до продуктивності системи
    – [вимога 1]
    – [вимога 2]
    ... інші вимоги

    Безпекові вимоги
    – [вимога 1]
    – [вимога 2]
    ... інші вимоги

    Вимоги до відмовостійкості системи
    – [вимога 1]
    – [вимога 2]
    ... інші вимоги

    Вимоги до масштабованості системи
    – [вимога 1]
    – [вимога 2]
    ... інші вимоги

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Use case
const stage4Config8 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      useCase: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            actor: {
              type: Type.STRING,
            },
            useCases: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["actor", "useCases"],
        },
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який створює діаграму варіантів використання. 

    Вхідні дані - систематизовані відповіді клієнта після уточнюючих інтерв’ю 
    Завдання: 
    Опиши варіанти використання (Use Cases) з вказанням актора та його дій.

    Відповідай строго у форматі:

    Актор: [назва актора]: 
        – [варіант використання]
        – [варіант використання]
        ... інші варіанти

    Актор: [назва актора]:  
        – [варіант використання]
        – [варіант використання]
        ... інші варіанти

    ... інші актори
    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// ERD діаграма
const stage4Config9 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      erd: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            entityName: {
              type: Type.STRING,
            },
            entityFields: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            entityConnections: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["entityName", "entityFields", "entityConnections"],
        },
      },
    },
  },
  systemInstruction: String.raw`
    Уяви, що ти бізнес-аналітик, який описує діаграму звʼязків між сутностями (ER-Diagram).

    Вхідні дані: [відповіді]

    Завдання:  
    Опиши сутності, їхні поля та звʼязки між ними.

    Відповідай строго у форматі:

    [назва сутності]:
    Поля:
      – [назва поля]  
      – [назва поля]  
      – ...  
    Зв’язки:
      – [назва сутності] (тип: [1:1 / 1:N / M:N]) — [пояснення, яке поле пов’язує]

    [назва сутності]:
      Поля:
        – ...  
      Зв’язки:
        – ...  

    ... інші сутності

    Не додавай пояснень, вступів, стилів, емоцій чи побажань.`,
};

// Опис бізнес-процесів
const stage4Config10 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      businessProcesses: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            processName: {
              type: Type.STRING,
            },
            processUsers: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            processDescription: {
              type: Type.STRING,
            },
          },
          propertyOrdering: [
            "processName",
            "processUsers",
            "processDescription",
          ],
        },
      },
    },
  },
  systemInstruction: String.raw`
 Уяви, що ти бізнес-аналітик, який створює підрозділ 4.3 "Опис бізнес-процесів" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: На основі наданих даних сформулюй опис ключових бізнес-процесів, які має підтримувати система. Для кожного процесу вкажи:
    – Назву
    – Учасників, які беруть у ньому участь
    – Короткий опис

    Формат відповіді має бути строго такий:

    [назва процесу]
    – Учасники процесу: [роль 1, роль 2, ...]
    – Опис процесу: [короткий опис]

    ... інші процеси

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Пріоритети за MSCW
const stage4Config11 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      mscv: {
        type: Type.OBJECT,
        properties: {
          mustHave: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          shouldHave: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          couldHave: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
          wontHave: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },
        propertyOrdering: ["mustHave", "shouldHave", "couldHave", "wontHave"],
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який проводить пріоритизацію вимог. 

    Вхідні дані - систематизовані відповіді клієнта після уточнюючих інтерв’ю
    Завдання: 
    Пріоритизуй усі вимоги за MSCV: must have, should have, could have, won’t have.

    Відповідай строго у форматі:

    Must have:  
        – [вимога]
        – [вимога]
        ... інші вимоги

    Should have:   
        – [вимога]
        – [вимога]
        ... інші вимоги

    Could have:  
        – [вимога]
        – [вимога]
        ... інші вимоги

    Von't have:  
        – [вимога]
        – [вимога]
        ... інші вимоги

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Завдання для MVP
const stage4Config12 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      mvp: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який виділяє задачі для реалізації MVP. 

    Вхідні дані - класифіковані дані
    Завдання: 
    Наведи перелік задач, які мають увійти до MVP.
    Відповідай строго у форматі:

    – [задача]
    – [задача]
    ... інші задачі

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Мета тестування
const stage4Config13 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      testingPurpose: {
        type: Type.STRING,
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який створює розділ 6 "Тестування системи" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: Сформулюй підрозділ 6.1 "Мета тестування" — коротко вкажи, для чого проводиться тестування системи, з урахуванням контексту її розробки.
    Формат відповіді:
    Мета тестування: [текст]
    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

// Опис сценаріїв тестування
const stage4Config14 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      testCases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
            },
            purpose: {
              type: Type.STRING,
            },
            expectedResult: {
              type: Type.STRING,
            },
            prerequisites: {
              type: Type.STRING,
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: [
            "title",
            "purpose",
            "expectedResult",
            "prerequisites",
            "steps",
          ],
        },
      },
    },
  },
  systemInstruction: String.raw`
 Уяви, що ти бізнес-аналітик, який створює підрозділ 6.2 "Тестові сценарії" для документа специфікації вимог до програмного забезпечення (SRS).
    Завдання: Створи перелік з щонайменше 5 тестових сценаріїв. Для кожного вкажи назву, мету, попередні умови, кроки виконання та очікуваний результат.

    Формат відповіді має бути лише таким:

    [Назва сценарію]:
    Мета: [що перевіряємо]
    Попередні умови: [що має бути виконано до початку]
    Очікуваний результат: [опис очікуваного результату]
    Кроки:
      1. ...
      2. ...
      ... інші кроки
    
    ... інші сценарії
    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

export const stage4ConfigPart1 = [
  stage4Config1,
  stage4Config2,
  stage4Config3,
  stage4Config4,
  stage4Config5,
  stage4Config6,
  stage4Config7,
];

export const stage4ConfigPart2 = [
  stage4Config8,
  stage4Config9,
  stage4Config10,
  stage4Config11,
  stage4Config12,
  stage4Config13,
  stage4Config14,
];
