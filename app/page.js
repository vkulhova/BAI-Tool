"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

const featureSections = [
  {
    icon: "📋",
    title: "Етап 1",
    desc: "Аналіз бізнес-вимог",
    color: " from-yellow-300 to-orange-300 dark:from-blue-500 dark:to-blue-600",
  },
  {
    icon: "🔍",
    title: "Етап 2",
    desc: "Структурований аналіз",
    color:
      "from-orange-300 to-orange-400 dark:from-indigo-500 dark:to-indigo-600",
  },
  {
    icon: "📊",
    title: "Етап 3",
    desc: "Додаткові вимоги",
    color: "from-orange-300 to-red-500 dark:from-purple-500 dark:to-purple-600",
  },
  {
    icon: "📝",
    title: "Етап 4",
    desc: "Генерація SRS",
    color: "from-orange-400 to-red-600 dark:from-violet-500 dark:to-violet-600",
  },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  const debouncedCharacterCount = useMemo(() => {
    return prompt.length;
  }, [prompt.length]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (prompt.trim()) {
        localStorage.setItem("initialPrompt", prompt.trim());
        router.push("/stages");
      }
    },
    [prompt, router]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const isPromptValid = useMemo(() => prompt.trim().length > 0, [prompt]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-300 to-orange-500 dark:from-blue-500 dark:to-purple-600 rounded-2xl mb-6 shadow-xl">
          <span className="text-2xl">🤖</span>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r text-orange dark:text-violet mb-4">
          BAI Tool
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Введіть вимоги до вашого проекту та дозвольте нашому ШІ допомогти вам
          проаналізувати та структурувати їх через комплексний 4-етапний процес.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="w-full max-w-4xl bg-beige2/95 dark:bg-black2/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-borderGray2/50 dark:border-borderGray/50">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200">
              Опишіть вимоги до вашого проекту
            </label>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={handlePromptChange}
                onKeyDown={handleKeyDown}
                placeholder="Детально опишіть ваш проект, його цілі, функціональні та нефункціональні вимоги..."
                className="w-full min-h-[250px] resize-vertical text-base bg-beige dark:bg-black1 border-borderGray2 dark:border-borderGray"
                style={{
                  resize: "vertical",
                  overflow: "auto",
                }}
              />
              <div className="absolute bottom-4 right-4 text-sm text-gray-400 dark:text-gray-500 pointer-events-none select-none">
                {debouncedCharacterCount} символів
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              type="submit"
              disabled={!isPromptValid}
              variant={isPromptValid ? "primary" : "secondary"}
              size="xl"
              className="transform hover:scale-105"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">🚀 Розпочати аналіз</span>
              </div>
            </Button>
          </div>
        </form>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full max-w-6xl">
        {featureSections.map((feature, index) => (
          <div
            key={index}
            className="bg-beige2/80 dark:bg-black2/80 backdrop-blur-sm rounded-xl p-6 text-center border border-borderGray2/50 dark:border-borderGray/50 hover:shadow-lg transition-all duration-300 group"
          >
            <div
              className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
              <span className="text-white text-xl">{feature.icon}</span>
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              {feature.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
