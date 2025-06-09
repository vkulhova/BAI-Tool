"use client";
import { useMemo, useCallback } from "react";
import { isValidAnswer } from "@/helpers/helpers";
import { useStageStatusStore } from "@/store/stageStatusStore";
import { useStageStore } from "@/store/stageStore";
import { useRouter } from "next/navigation";

const useStage1 = () => {
  const router = useRouter();

  const resp = useStageStore((state) => state.stageResponse.stage1.resp);
  const isLoading = useStageStore(
    (state) => state.stageResponse.stage1.isLoading
  );
  const stageAnswers = useStageStore((state) => state.stage1Answers);
  const setStageAnswer = useStageStore((state) => state.setStage1Answer);

  const setStageResponse = useStageStore((state) => state.setStageResponse);
  const resetStageProgress = useStageStore((state) => state.resetProgress);

  const isStageInEditMode = useStageStatusStore(
    (state) => state.isStageInEditMode
  );
  const setStageEditMode = useStageStatusStore(
    (state) => state.setStageEditMode
  );
  const setSelectedStage = useStageStatusStore(
    (state) => state.setSelectedStage
  );
  const setStageCompleted = useStageStatusStore(
    (state) => state.setStageCompleted
  );

  const isEditing = isStageInEditMode("stage1");

  const handleNextStage = () => {
    setStageCompleted("stage1");
    setStageEditMode("stage2", true, () => {
      ["stage2", "stage3", "stage4"].forEach((stage) =>
        resetStageProgress(stage)
      );
    });
    setStageResponse("stage2", []);
    setSelectedStage("stage2");
  };

  const createQuestionsList = (categories) => {
    let questions = [];
    if (categories.length > 0) {
      categories.forEach((category, categoryIndex) => {
        category.questions.forEach((question, questionIndex) => {
          questions.push({
            id: `${categoryIndex}-${questionIndex}`,
            categoryTitle: category.categoryTitle,
            question: question,
          });
        });
      });
    }

    return questions;
  };

  const checkAllQuestionsAnswered = (questions, answers) => {
    if (questions.length === 0) return false;
    return questions.every(
      (q) => answers[q.id]?.isSkipped || isValidAnswer(answers[q.id])
    );
  };

  const allQuestions = useMemo(
    () => createQuestionsList(resp),
    [resp, createQuestionsList]
  );
  const allQuestionsAnswered = useMemo(
    () => checkAllQuestionsAnswered(allQuestions, stageAnswers),
    [allQuestions, stageAnswers, checkAllQuestionsAnswered]
  );

  const handleAnswerChange = useCallback(
    (questionId, answer, isSkipped) => {
      if (!isEditing) {
        return;
      }
      setStageAnswer(questionId, answer, isSkipped);
    },
    [setStageAnswer, isEditing]
  );

  const handleEditMode = () => {
    setStageEditMode("stage1", true, () => {
      ["stage2", "stage3", "stage4"].forEach((stage) =>
        resetStageProgress(stage)
      );
    });
    router.refresh();
  };

  const getButtonConfig = () => {
    if (isEditing) {
      return {
        text: "🚀 Перейти до Етапу 2",
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
    buttonConfig,
    allQuestions,
    isLoading,
    resp,
    isEditing,
    stageAnswers,
    handleAnswerChange,
  };
};

export default useStage1;
