export const isValidAnswer = (answer) => {
  return answer?.answer && answer.answer.trim().length > 0;
};
