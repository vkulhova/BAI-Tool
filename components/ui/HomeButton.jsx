"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useStageStore } from "@/store/stageStore";
import { useStageStatusStore } from "@/store/stageStatusStore";

const HomeButton = () => {
  const router = useRouter();
  const resetProgress = useStageStore((state) => state.resetAllProgress);
  const resetStatusProgress = useStageStatusStore(
    (state) => state.resetAllProgress
  );

  const handleFinishSession = () => {
    router.push("/");
    resetProgress();
    resetStatusProgress();
  };

  return (
    <Button onClick={handleFinishSession} size="sm" variant="primary">
      Home
    </Button>
  );
};

export default HomeButton;
