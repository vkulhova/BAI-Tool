import stage1Config from "@/ai/promptConfigs/stage1Config";
import stage2Config from "@/ai/promptConfigs/stage2Config";
import stage3Config from "@/ai/promptConfigs/stage3Config";
import {
  stage4ConfigPart1,
  stage4ConfigPart2,
} from "@/ai/promptConfigs/stage4Config";

export const stages = {
  stage1: {
    title: "Етап 1",
    config: stage1Config,
  },
  stage2: {
    title: "Етап 2",
    config: stage2Config,
  },
  stage3: {
    title: "Етап 3",
    config: stage3Config,
  },
  stage4: {
    title: "Етап 4",
    config1: stage4ConfigPart1,
    config2: stage4ConfigPart2,
  },
};
