import { useEntity } from "@leanscope/ecs-engine";
import { AdditionalTags } from "../../../base/constants";
import { PositionFacet } from "@leanscope/ecs-models";

export const usePlayer = () => {
  const [playerEntity] = useEntity((e) => e.hasTag(AdditionalTags.PLAYER));

  const positionX = playerEntity?.get(PositionFacet)?.props.positionX || 0;
  const positionY = playerEntity?.get(PositionFacet)?.props.positionY || 0;

  return { positionX, positionY, playerEntity };
};
