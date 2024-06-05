import { useEntity } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";

export const usePlayer = () => {
  const [playerEntity] = useEntity((e) => e.get(IdentifierFacet)?.props.guid === "player");
  console.log("playerEntity", playerEntity);

  const positionX = playerEntity?.get(PositionFacet)?.props.positionX ?? 0;
  const positionY = playerEntity?.get(PositionFacet)?.props.positionY ?? 0;

  return { positionX, positionY, playerEntity };
};
