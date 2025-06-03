"use client";

import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useStage4 } from "@/components/stages/Stage4/useStage4";
import Stage4Results from "@/components/stages/Stage4/Stage4Results";
import Button from "@/components/ui/Button";
import ScrollToTopButton from "@/components/ui/ScrollToTopButton";

const Stage4 = () => {
  const { resp, isLoading, handleFinishSession } = useStage4();

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl text-darkOrange dark:text-violet font-bold">
          Етап 4
        </h2>
        <div className="flex gap-3">
          {resp && resp.length > 0 && (
            <Button onClick={handleFinishSession} variant="primary">
              🔄 Почати з початку
            </Button>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner />
        </div>
      )}

      {!isLoading && (
        <div className="space-y-8">
          {resp && resp.length > 0 && <Stage4Results resp={resp} />}
          <ScrollToTopButton />
        </div>
      )}
    </div>
  );
};

export default Stage4;
