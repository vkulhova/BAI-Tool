"use client";

import { ai } from "./client";

export const aiTextRequest = async ({ prompt, configs }) => {
  const results = [];
  for (const config of configs) {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: config,
    });

    results.push(result);
  }
  return results;
};
