import { useStageStore } from "@/store/stageStore";
import { useStageStatusStore } from "@/store/stageStatusStore";

import { useEffect, useCallback, useState } from "react";
import { aiTextRequest } from "@/ai/scripts/request";
import { stages } from "@/ai/promptConfigs/stagePrompts";

const useStage2 = () => {
  const resp = useStageStore((state) => state.stageResponse.stage2.resp);
  const isLoading = useStageStore(
    (state) => state.stageResponse.stage2.isLoading
  );

  const setStageResponse = useStageStore((state) => state.setStageResponse);
  const setStageLoading = useStageStore((state) => state.setStageLoading);

  const stage1Resp = useStageStore((state) => state.stageResponse.stage1.resp);
  const stage1Answers = useStageStore((state) => state.stage1Answers);

  const resetStageProgress = useStageStore((state) => state.resetProgress);

  const setStageEditMode = useStageStatusStore(
    (state) => state.setStageEditMode
  );
  const stageCompletion = useStageStatusStore((state) => state.stageCompletion);
  const setSelectedStage = useStageStatusStore(
    (state) => state.setSelectedStage
  );
  const setStageCompleted = useStageStatusStore(
    (state) => state.setStageCompleted
  );

  const [isSummarized, setIsSummarized] = useState(false);

  const isCompleted = stageCompletion.stage2;

  const getFormattedQA = useCallback(() => {
    return stage1Resp.flatMap((category, categoryIndex) =>
      category.questions
        .map((question, questionIndex) => {
          const questionId = `${categoryIndex}-${questionIndex}`;
          const answer = stage1Answers[questionId] || "";

          return (stage1Answers[questionId].isSkipped || answer?.answer.trim())
            ? {
                category: category.categoryTitle,
                question,
                answer,
              }
            : null;
        })
        .filter(Boolean)
    );
  }, [stage1Resp, stage1Answers]);

  const handleEditMode = () => {
    setStageEditMode("stage2", true, () => {
      ["stage3", "stage4"].forEach((stage) => resetStageProgress(stage));
    });
    setStageResponse("stage3", []);
    setIsSummarized(false);
  };

  const handleSummarize = async () => {
    const formattedQA = getFormattedQA();

    if (formattedQA.length === 0) {
      alert("No Stage 1 answers found to summarize");
      return;
    }
    handlePrompt(JSON.stringify(formattedQA));
  };

  const handlePrompt = async (promptText) => {
    setStageLoading("stage2", true);
    try {
      const result = await aiTextRequest({
        prompt: " User input: " + promptText,
        configs: stages.stage2.config || [],
      });
      const responses = result.map((res) => JSON.parse(res.text));
      setStageResponse("stage2", responses.flat());
    } catch (error) {
      console.error("Error processing initial prompt:", error);
    } finally {
      setStageLoading("stage2", false);
    }
  };

  const handleNextStage = () => {
    setStageCompleted("stage2");
    setStageEditMode("stage3", true, () => {
      ["stage3", "stage4"].forEach((stage) => resetStageProgress(stage));
    });
    setStageResponse("stage3", []);
    setSelectedStage("stage3");
  };

  useEffect(() => {
    const formattedQA = getFormattedQA();
    if (
      formattedQA.length > 0 &&
      resp.length === 0 &&
      !isLoading &&
      !isSummarized
    ) {
      handleSummarize();
    }
  }, [stage1Resp, stage1Answers, isLoading, isSummarized]);

  useEffect(() => {
    setIsSummarized(resp.length > 0);
  }, [resp.length]);

  const getButtonConfig = () => {
    if (!isSummarized) {
      return null;
    }

    if (isCompleted) {
      return {
        text: "🔁 Перегенерувати",
        onClick: handleEditMode,
        variant: "primary",
      };
    } else {
      return {
        text: "🚀 Перейти до Етапу 3",
        onClick: handleNextStage,
        variant: "primary",
      };
    }
  };

  const buttonConfig = getButtonConfig();

  return {
    buttonConfig,
    resp,
    isLoading,
    isSummarized,
    getFormattedQA,
  };
};

export default useStage2;
