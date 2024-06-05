import { useEntity } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";

export const usePlayer = () => {
  const [playerEntity] = useEntity((e) => e.get(IdentifierFacet)?.props.guid === "player");

  const playerPositionX = playerEntity?.get(PositionFacet)?.props.positionX ?? 0;
  const playerPositionY = playerEntity?.get(PositionFacet)?.props.positionY ?? 0;

  return { playerPositionX, playerPositionY, playerEntity };
};

