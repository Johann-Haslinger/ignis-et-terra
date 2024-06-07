import { useEntity, useEntityComponents } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { DirectionFacet, ManaCountFacet } from "../../../app/gameFacets";

export const usePlayer = () => {
  const [playerEntity] = useEntity((e) => e.get(IdentifierFacet)?.props.guid === "player");

  const playerPositionX = playerEntity?.get(PositionFacet)?.props.positionX ?? 0;
  const playerPositionY = playerEntity?.get(PositionFacet)?.props.positionY ?? 0;

  const [playerDirectionProps, manaCountProps] = useEntityComponents(playerEntity, DirectionFacet, ManaCountFacet);
  const playerDirection = playerDirectionProps?.props.direction;
  const playerManaCount = manaCountProps?.props.manaCount;

  return { playerPositionX, playerPositionY, playerEntity, playerDirection, playerManaCount };
};
