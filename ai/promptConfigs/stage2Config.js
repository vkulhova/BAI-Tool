import { Type } from "@google/genai";

const stage2Config1 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      what: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
      why: {
        type: Type.ARRAY,
        items: {
          type: Type.STRING,
        },
      },
      who: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            user: {
              type: Type.STRING,
            },
            goal: {
              type: Type.STRING,
            },
          },
          propertyOrdering: ["user", "goal"],
        },
      },
    },
    propertyOrdering: ["what", "why", "who"],
  },
  systemInstruction: String.raw`Уяви, що ти бізнес-аналітик на етапі інтерпретації і категоризації вхідної інформації від клієнта. 
    Вхідні дані - інтервʼю з клієнтом. 
    Завдання: 
    Класифікуй інформацію за трьома блоками: 
        – Що хочуть? 
        – Чому це потрібно? 
        – Для кого і навіщо?
        
    Відповідай строго у форматі:

        1. Що хочуть:
        – [запит]
        – [запит]
        ... інші запити

        2. Чому це потрібно:
        – [потреба]
        – [потреба]
        ... інші потреби

        3. Для кого і навіщо:
        – [користувач]
        – [цінність для користувача]
        – [користувач]
        – [цінність для користувача]
        ... інші користувачі та цінності для них

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

const stage2Config2 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      cases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            categoryTitle: {
              type: Type.STRING,
            },
            cases: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["categoryTitle", "cases"],
        },
      },
    },
  },
  systemInstruction: String.raw`
    Уяви, що ти бізнес-аналітик на етапі інтерпретації і категоризації вхідної інформації від клієнта. 
    Вхідні дані - інтервʼю з клієнтом. 
    Завдання: 

    Визнач основні запити (початкова структура майбутніх вимог), класифікувавши їх за такими категоріями: бізнес-вимоги, продуктова візія, 
    цільова аудиторія, користувацькі сценарії, функціональні очікування, технічні інтеграції, 
    обмеження та безпека, очікувані строки та обмеження, попередні спроби / референси.

    Відповідай строго у форматі:

    Бізнес-вимоги:
        – [опис запиту]
        – [опис запиту]
        ... інші описи запитів

    Бізнес-вимоги:
        – [опис запиту]
        – [опис запиту]
        ... інші описи запитів

    ... інші категорії

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

const stage2Config3 = {
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
            functions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["moduleTitle", "functions"],
        },
      },
    },
  },
  systemInstruction: String.raw`Уяви, що ти бізнес-аналітик на етапі інтерпретації і категоризації вхідної інформації від клієнта. 
    Вхідні дані - інтервʼю з клієнтом. 
    Завдання: 
    Сформуй структуру модулів системи. Для кожного модуля перелічуй 3–5 основних функцій.

    Відповідай строго у форматі:

    [назва модуля]:
        – [функція модуля]
        – [функція модуля]
        ... інші функції модуля

    [назва модуля]:
        – [функція модуля]
        – [функція модуля]
        ... інші функції модуля

    ... інші модулі

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

const stage2Config4 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      typicalSystemUsers: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            userName: {
              type: Type.STRING,
            },
            userGoals: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            userFeatures: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            flowScenarios: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: [
            "userName",
            "userGoals",
            "userFeatures",
            "flowScenarios",
          ],
        },
      },
    },
  },
  systemInstruction: String.raw`
    Уяви, що ти бізнес-аналітик, який деталізує типових користувачів і сценарії їхньої взаємодії із системою. 
    Вхідні дані - [класифіковані дані]
    
    Завдання:

    Описати усіх типових користувачів з їх роллю, цілями і особливостями. Для кожного користувача наведи 3–5 flow-сценаріїв дій.

    Відповідай строго у форматі:

    [назва користувача]  
        Роль: [роль користувача]  
        Цілі:  
            – [ціль користувача]  
            – ...
        Особливості:  
            – [особливість користувача]  
            – ...
        Flow-сценарії:  
            – [сценарій дій]  
            – ...  

    [назва користувача]  
        Роль: [роль користувача]  
        ... інші поля  
    
    ... інші користувачі

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

const stage2Config5 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      businessDescription: {
        type: Type.STRING,
      },
    },
  },
  systemInstruction: String.raw`
    Уяви, що ти бізнес-аналітик, який коротко описує бізнес, на основі проведеного інтервʼю з клієнтом. 

    Вхідні дані: інтервʼю з клієнтом:
    [інтервʼю]

    Завдання:
    Коротко опиши основну інформацію про бізнес клієнта

    Відповідай строго у форматі:

    Опис бізнесу: [текст]

    Не додавай пояснень, емоцій, вступів, заключень, стилів чи побажань.`,
};

const stage2Config = [
  stage2Config1,
  stage2Config2,
  stage2Config3,
  stage2Config4,
  stage2Config5,
];
export default stage2Config;
