import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStageStatusStore = create()(
  persist(
    (set) => ({
      selectedStage: "stage1",
      stageCompletion: {
        stage1: false,
        stage2: false,
        stage3: false,
        stage4: false,
      },
      stageEditModes: {
        stage1: true,
        stage2: false,
        stage3: false,
        stage4: false,
      },
      setSelectedStage: (stage) => set(() => ({ selectedStage: stage })),
      setStageCompleted: (stage) =>
        set((state) => ({
          stageCompletion: {
            ...state.stageCompletion,
            [stage]: true,
          },
          stageEditModes: {
            ...state.stageEditModes,
            [stage]: false,
          },
        })),

      setStageEditMode: (stage, isEditing, clearStages) =>
        set((state) => {
          const newStageEditModes = { ...state.stageEditModes };
          let newStageCompletion = { ...state.stageCompletion };

          if (isEditing) {
            newStageEditModes[stage] = true;

            const stages = ["stage1", "stage2", "stage3", "stage4"];
            const currentIndex = stages.indexOf(stage);

            for (let i = currentIndex; i < stages.length; i++) {
              newStageCompletion[stages[i]] = false;
              if (i > currentIndex) {
                newStageEditModes[stages[i]] = false;
              }
            }

            let newState = {
              selectedStage: state.selectedStage,
              stageEditModes: newStageEditModes,
              stageCompletion: newStageCompletion,
            };

            clearStages();

            return newState;
          } else {
            newStageEditModes[stage] = false;
            return {
              ...state,
              stageEditModes: newStageEditModes,
            };
          }
        }),

      isStageAccessible: (stage) => {
        if (typeof window === "undefined") {
          if (stage === "stage1") return true;
          return false;
        }

        const state = useStageStatusStore.getState();
        if (stage === "stage1") return true;
        if (stage === "stage2") return state.stageCompletion.stage1;
        if (stage === "stage3") return state.stageCompletion.stage2;
        if (stage === "stage4") return state.stageCompletion.stage3;
        return false;
      },

      isStageInEditMode: (stage) => {
        const state = useStageStatusStore.getState();
        return state.stageEditModes[stage];
      },

      resetAllProgress: () =>
        set(() => ({
          stageCompletion: {
            stage1: false,
            stage2: false,
            stage3: false,
            stage4: false,
          },
          stageEditModes: {
            stage1: true,
            stage2: false,
            stage3: false,
            stage4: false,
          },
        })),
    }),
    {
      name: "stage-status-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
