import { useEffect, useState } from "react";
import { aiTextRequest } from "@/ai/scripts/request";
import { stages } from "@/ai/promptConfigs/stagePrompts";
import { useStageStatusStore } from "@/store/stageStatusStore";
import { useRouter } from "next/navigation";
import { useStageStore } from "@/store/stageStore";

export const useStage4 = () => {
  const router = useRouter();

  const resp = useStageStore((state) => state.stageResponse.stage4.resp);
  const isLoading = useStageStore(
    (state) => state.stageResponse.stage4.isLoading
  );
  const setStageResponse = useStageStore((state) => state.setStageResponse);
  const setStageLoading = useStageStore((state) => state.setStageLoading);

  const stage2Resp = useStageStore((state) => state.stageResponse.stage2.resp);
  const stage3Resp = useStageStore((state) => state.stageResponse.stage3.resp);
  const stage3Answers = useStageStore((state) => state.stage3Answers);

  const resetProgress = useStageStore((state) => state.resetAllProgress);
  const resetStatusProgress = useStageStatusStore(
    (state) => state.resetAllProgress
  );

  const setStageCompleted = useStageStatusStore(
    (state) => state.setStageCompleted
  );

  const [isProcessed, setIsProcessed] = useState(false);

  const preparePromptData = () => {
    let promptData = "Дані з попередніх етапів:\n\n";

    if (stage2Resp && stage2Resp.length > 0) {
      promptData += "=== ЕТАП 2 ===\n";
      promptData += JSON.stringify(stage2Resp);
    }

    if (
      stage3Resp &&
      stage3Resp.length > 0 &&
      Object.keys(stage3Answers).length > 0
    ) {
      promptData += "=== ЕТАП 3 - ВІДПОВІДІ НА УТОЧНЮЮЧІ ПИТАННЯ ===\n";

      stage3Resp.flatMap((section, sectionIndex) => {
        const sectionKey = Object.keys(section)[0];

        const categories = section[sectionKey];
        categories.forEach((category, categoryIndex) => {
          promptData += `\n${category.categoryTitle}:\n`;
          category.questions.forEach((question, questionIndex) => {
            const questionId = `${sectionIndex}-${categoryIndex}-${questionIndex}`;
            const answer = stage3Answers[questionId] || "";
            if (answer?.isSkipped || answer?.answer.trim()) {
              promptData += `Питання: ${question}\nВідповідь: ${answer?.answer}\n\n`;
            }
          });
        });
      });
    }

    return promptData;
  };

  const handleProcessData = async () => {
    if (!stage2Resp || stage2Resp.length === 0) {
      console.log("No stage2 data available");
      return;
    }
    setStageLoading("stage4", true);

    try {
      const promptData = preparePromptData();

      const result1 = await aiTextRequest({
        prompt: promptData,
        configs: stages.stage4.config1 || [],
      });

      const result2 = await aiTextRequest({
        prompt: promptData,
        configs: stages.stage4.config2 || [],
      });

      const responses = [...result1, ...result2].map((res) =>
        JSON.parse(res.text)
      );
      console.log("Parsed responses:", responses);

      setStageResponse("stage4", responses);
      setIsProcessed(true);
      setStageCompleted("stage4");
    } catch (error) {
      console.error("Error processing Stage 4 data:", error);
    } finally {
      setStageLoading("stage4", false);
    }
  };

  const handleFinishSession = () => {
    router.push("/");
    resetProgress();
    resetStatusProgress();
  };

  useEffect(() => {
    if (
      stage2Resp &&
      stage2Resp.length > 0 &&
      stage3Resp &&
      stage3Resp.length > 0 &&
      Object.keys(stage3Answers).length > 0 &&
      resp.length === 0 &&
      !isProcessed
    ) {
      handleProcessData();
    }
  }, [stage2Resp, stage3Resp, stage3Answers, isProcessed, resp]);

  return {
    resp,
    isLoading,
    handleProcessData,
    handleFinishSession,
  };
};
