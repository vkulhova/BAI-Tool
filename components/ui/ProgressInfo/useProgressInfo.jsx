import { isValidAnswer } from "@/helpers/helpers";
import { useStageStatusStore } from "@/store/stageStatusStore";

const useProgressInfo = ({ allQuestions, answers, resp, stage }) => {
  const isStageInEditMode = useStageStatusStore(
    (state) => state.isStageInEditMode
  );
  const isEditing = isStageInEditMode(stage);

  const answeredCount = allQuestions.filter(
    (q) => answers[q.id]?.isSkipped || isValidAnswer(answers[q.id])
  ).length;

  const progressPercentage =
    allQuestions.length > 0 ? (answeredCount / allQuestions.length) * 100 : 0;

  const categories = resp || [];

  const categoryProgress = categories.map((category, index) => {
    const categoryQuestions = category.questions || [];
    const sectionIndex = String(category.sectionIndex);
    const categoryIndex = String(category.categoryIndex);

    const categoryAnswered = categoryQuestions.filter((_, qIndex) => {
      const questionId =
        category.sectionIndex !== undefined
          ? `${sectionIndex}-${categoryIndex}-${qIndex}`
          : `${index}-${qIndex}`;

      return (
        answers[questionId]?.isSkipped || isValidAnswer(answers[questionId])
      );
    }).length;

    return {
      title: category.categoryTitle,
      completed:
        categoryAnswered === categoryQuestions.length &&
        categoryQuestions.length > 0,
      progress:
        categoryQuestions.length > 0
          ? (categoryAnswered / categoryQuestions.length) * 100
          : 0,
      current:
        categoryAnswered > 0 && categoryAnswered < categoryQuestions.length,
    };
  });

  return {
    isEditing,
    categoryProgress,
    progressPercentage,
  };
};

export default useProgressInfo;
