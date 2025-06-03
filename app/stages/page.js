"use client";

import Timeline from "@/components/ui/Timeline";
import Stage1 from "@/components/stages/Stage1/Stage1";
import Stage2 from "@/components/stages/Stage2/Stage2";
import Stage3 from "@/components/stages/Stage3/Stage3";
import Stage4 from "@/components/stages/Stage4/Stage4";
import { stages } from "@/ai/promptConfigs/stagePrompts";
import { useEffect, useState } from "react";
import { aiTextRequest } from "@/ai/scripts/request";
import { useStageStatusStore } from "@/store/stageStatusStore";
import { useStageStore } from "@/store/stageStore";

export default function StagesPage() {
  const [isMounted, setIsMounted] = useState(false);

  const setStageResponse = useStageStore((state) => state.setStageResponse);
  const setStageLoading = useStageStore((state) => state.setStageLoading);

  const selectedStage = useStageStatusStore((state) => state.selectedStage);

  useEffect(() => {
    const initialPrompt = localStorage.getItem("initialPrompt");
    if (initialPrompt) {
      localStorage.removeItem("initialPrompt");
      handleInitialPrompt(initialPrompt);
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInitialPrompt = async (promptText) => {
    setStageLoading("stage1", true);
    try {
      const result = await aiTextRequest({
        prompt: " User input: " + promptText,
        configs: stages.stage1.config || [],
      });
      const responses = result.map((res) => JSON.parse(res.text));
      setStageResponse("stage1", responses.flat());
    } catch (error) {
      console.error("Error processing initial prompt:", error);
    } finally {
      setStageLoading("stage1", false);
    }
  };

  const renderedStages = {
    stage1: <Stage1 />,
    stage2: <Stage2 />,
    stage3: <Stage3 />,
    stage4: <Stage4 />,
  };

  if (!isMounted) {
    return (
      <div className="flex flex-col gap-6 w-full items-center min-h-screen py-4">
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="relative">
            <div className="hidden md:block">
              <div className="flex justify-between items-start relative">
                {/* Placeholder skeleton for Timeline */}
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center relative flex-1"
                  >
                    <div className="relative z-10 mb-6">
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 animate-pulse"></div>
                    </div>
                    <div className="w-16 h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          {renderedStages[selectedStage] || (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Stage not found
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full items-center min-h-screen py-4">
      <Timeline stages={stages} />
      <div className="w-full flex justify-center">
        {renderedStages[selectedStage] || (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stage not found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
