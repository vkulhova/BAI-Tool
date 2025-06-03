import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStageStore = create()(
  persist(
    (set) => ({
      stageResponse: {
        stage1: {
          resp: [],
          isLoading: false,
        },
        stage2: {
          resp: [],
          isLoading: false,
        },
        stage3: {
          resp: [],
          isLoading: false,
        },
        stage4: { resp: [], isLoading: false },
      },
      stage1Answers: {},
      stage3Answers: {},
      setStageResponse: (stage, response) =>
        set((state) => ({
          stageResponse: {
            ...state.stageResponse,
            [stage]: { ...state.stageResponse[stage], resp: response },
          },
        })),
      setStageLoading: (stage, isLoading) =>
        set((state) => ({
          stageResponse: {
            ...state.stageResponse,
            [stage]: { ...state.stageResponse[stage], isLoading },
          },
        })),
      setStage1Answer: (questionId, answer, isSkipped) =>
        set((state) => ({
          stage1Answers: {
            ...state.stage1Answers,
            [questionId]: { answer: answer, isSkipped: isSkipped },
          },
        })),
      setStage3Answer: (questionId, answer, isSkipped) =>
        set((state) => ({
          stage3Answers: {
            ...state.stage3Answers,
            [questionId]: { answer: answer, isSkipped: isSkipped },
          },
        })),
      clearStage1Answers: () =>
        set(() => ({
          stage1Answers: {},
        })),
      clearStage3Answers: () =>
        set(() => ({
          stage3Answers: {},
        })),
      getFormattedAnswers: (stage) => {
        const state = useStore.getState();
        return state.stage1Answers;
      },
      resetProgress: (stage) =>
        set((state) => {
          if (stage === "stage1") {
            return {
              stageResponse: {
                ...state.stageResponse,
                stage1: { isLoading: false, resp: [] },
              },
              stage1Answers: {},
            };
          } else if (stage === "stage2") {
            return {
              stageResponse: {
                ...state.stageResponse,
                stage2: { isLoading: false, resp: [] },
              },
            };
          } else if (stage === "stage3") {
            return {
              stageResponse: {
                ...state.stageResponse,
                stage3: { isLoading: false, resp: [] },
              },
              stage3Answers: {},
            };
          } else {
            return {
              stageResponse: {
                ...state.stageResponse,
                stage4: { isLoading: false, resp: [] },
              },
            };
          }
        }),
      resetAllProgress: () =>
        set(() => ({
          stage1Answers: {},
          stage3Answers: {},
          stageResponse: {
            stage1: { resp: [], isLoading: false },
            stage2: { resp: [], isLoading: false },
            stage3: { resp: [], isLoading: false },
            stage4: { resp: [], isLoading: false },
          },
        })),
    }),
    {
      name: "stage-response-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
