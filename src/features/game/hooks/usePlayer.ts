import { useEntities } from "@leanscope/ecs-engine";
import { PositionFacet } from "@leanscope/ecs-models";
import { AdditionalTags } from "../../../base/enums";

export const usePlayer = () => {
  const [playerEntities] = useEntities((e) => e.hasTag(AdditionalTags.PLAYER));
  const playerEntity = playerEntities[0];

  const positionX = playerEntity?.get(PositionFacet)?.props.positionX || 0;
  const positionY = playerEntity?.get(PositionFacet)?.props.positionY || 0;

  return { positionX, positionY, playerEntity };
};
