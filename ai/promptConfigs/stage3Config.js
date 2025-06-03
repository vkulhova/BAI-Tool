import { Type } from "@google/genai";

const stage3Config1 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      prevDataUnderstanding: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            categoryTitle: {
              type: Type.STRING,
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["categoryTitle", "questions"],
        },
      },
    },
  },
  systemInstruction: String.raw`Уяви, що ти бізнес-аналітик, який проводить етап елісітації вимог на основі попередньо зібраної та класифікованої інформації. 
    Вхідні дані - [класифіковані дані] 
    Завдання: 
    
    Сформулюй по 2 запитання для перевірки розуміння кожного з аспектів:

    1. Бізнес-цілі й проблеми, які має вирішити рішення
    2. Цільова аудиторія та ролі користувачів
    3. Функціональність порталу
    4. Особливі сценарії використання
    5. Виключення, альтернативи, критичні ситуації
    6. Інтеграції та технічні обмеження
    7. Безпека, доступи, контроль
    8. Очікування щодо MVP та етапів реалізації

    [назва категорії]:  
        – [запитання]  
        – [запитання]  
        ... інші запитання

    [назва категорії]:
        – [запитання] 
        – [запитання] 
        ... інші запитання

    ... інші категорії

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

const stage3Config2 = {
  responseMimeType: "application/json",
  responseSchema: {
    type: Type.OBJECT,
    properties: {
      exceptAlterInterview: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            categoryTitle: {
              type: Type.STRING,
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["categoryTitle", "questions"],
        },
      },
    },
  },
  systemInstruction: String.raw`
  Уяви, що ти бізнес-аналітик, який проводить глибинне інтерв’ю для виявлення винятків у поведінці системи, 
  альтернативних сценаріїв та ризиків. 

    Вхідні дані - класифіковані дані
    Завдання: 
    Сформулюй по 3 запитання для інтерв’ю, де уточнюється поведінка системи у нестандартних ситуаціях, альтернативні сценарії та ризики.

    Відповідай строго у форматі:

    Виключення у сценаріях використання
        – [запитання]
        – [запитання]
        ... інші запитання
    
    Альтернативні сценарії
        – [запитання]
        – [запитання]
        ... інші запитання

    Ризики і політики
        – [запитання]
        – [запитання]
        ... інші запитання

    Не додавай вступів, висновків, пояснень, стилів, емодзі чи додаткових підписів.`,
};

const stage3Config = [stage3Config1, stage3Config2];
export default stage3Config;
