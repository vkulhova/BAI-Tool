import { useStageStore } from "@/store/stageStore";
import { useStageStatusStore } from "@/store/stageStatusStore";
import { useState, useEffect, useMemo } from "react";
import { aiTextRequest } from "@/ai/scripts/request";
import { stages } from "@/ai/promptConfigs/stagePrompts";
import { isValidAnswer } from "@/helpers/helpers";

const useStage3 = () => {
  const resp = useStageStore((state) => state.stageResponse.stage3.resp);
  const isLoading = useStageStore(
    (state) => state.stageResponse.stage3.isLoading
  );

  const stage2Resp = useStageStore((state) => state.stageResponse.stage2.resp);

  const stageAnswers = useStageStore((state) => state.stage3Answers);
  const setStageAnswer = useStageStore((state) => state.setStage3Answer);

  const setStageResponse = useStageStore((state) => state.setStageResponse);
  const setStageLoading = useStageStore((state) => state.setStageLoading);
  const resetStageProgress = useStageStore((state) => state.resetProgress);

  const isStageInEditMode = useStageStatusStore(
    (state) => state.isStageInEditMode
  );
  const setStageEditMode = useStageStatusStore(
    (state) => state.setStageEditMode
  );
  const stageCompletion = useStageStatusStore((state) => state.stageCompletion);
  const setStageCompleted = useStageStatusStore(
    (state) => state.setStageCompleted
  );

  const setSelectedStage = useStageStatusStore(
    (state) => state.setSelectedStage
  );

  const [isProcessed, setIsProcessed] = useState(false);

  const isEditing = isStageInEditMode("stage3");
  const isCompleted = stageCompletion.stage3;

  const handlePrompt = async (promptText) => {
    setStageLoading("stage3", true);
    try {
      const result = await aiTextRequest({
        prompt: " User input: " + promptText,
        configs: stages.stage3.config || [],
      });
      const responses = result.map((res) => JSON.parse(res.text));
      setStageResponse("stage3", responses.flat());
    } catch (error) {
      console.error("Error processing initial prompt:", error);
    } finally {
      setStageLoading("stage3", false);
    }
  };

  const handleProcessStage2Data = async () => {
    if (!stage2Resp || stage2Resp.length === 0) {
      console.warn("No Stage 2 data found to process");
      return;
    }

    handlePrompt(JSON.stringify(stage2Resp));
  };

  useEffect(() => {
    if (
      stage2Resp.length > 0 &&
      resp.length === 0 &&
      !isProcessed &&
      !isLoading
    ) {
      handleProcessStage2Data();
    }
  }, [stage2Resp, isProcessed, isLoading]);

  const allQuestions = useMemo(() => {
    const questions = [];
    resp.forEach((section, sectionIndex) => {
      const sectionKey = Object.keys(section)[0];
      const categories = section[sectionKey];

      categories.forEach((category, categoryIndex) => {
        category.questions.forEach((question, questionIndex) => {
          questions.push({
            id: `${sectionIndex}-${categoryIndex}-${questionIndex}`,
            categoryTitle: category.categoryTitle,
            question: question,
            sectionName: sectionKey,
          });
        });
      });
    });
    return questions;
  }, [resp]);

  const allQuestionsAnswered = useMemo(() => {
    if (allQuestions.length === 0) return false;
    return allQuestions.every(
      (q) =>
        stageAnswers[q.id]?.isSkipped ||
        isValidAnswer(stageAnswers[q.id])
    );
  }, [allQuestions, stageAnswers]);

  const handleAnswerChange = (questionId, answer, isSkipped) => {
    if (!isEditing) return;
    setStageAnswer(questionId, answer, isSkipped);
  };

  const handleEditMode = () => {
    setStageEditMode("stage3", true, () => {
      ["stage4"].forEach((stage) => resetStageProgress(stage));
    });
  };

  useEffect(() => {
    setIsProcessed(resp.length > 0);
  }, [resp.length]);

  const handleNextStage = () => {
    setStageCompleted("stage3");
    setStageEditMode("stage4", true, () => {
      ["stage4"].forEach((stage) => resetStageProgress(stage));
    });
    setStageResponse("stage4", []);
    setSelectedStage("stage4");
  };

  const getButtonConfig = () => {
    if (!isProcessed || allQuestions.length === 0) {
      return null;
    }

    if (isEditing) {
      return {
        text: "🚀 Перейти до Етапу 4",
        disabled: !allQuestionsAnswered,
        onClick: handleNextStage,
        variant: allQuestionsAnswered ? "primary" : "secondary",
      };
    } else {
      return {
        text: "✏️ Редагувати",
        disabled: false,
        onClick: handleEditMode,
        variant: "primary",
      };
    }
  };

  const buttonConfig = getButtonConfig();

  return {
    resp,
    isLoading,
    isProcessed,
    stageAnswers,
    allQuestions,
    isEditing,
    isCompleted,
    handleProcessStage2Data,
    handleAnswerChange,
    buttonConfig,
  };
};

export default useStage3;
