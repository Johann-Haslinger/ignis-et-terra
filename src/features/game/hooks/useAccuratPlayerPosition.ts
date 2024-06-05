import { useEntityComponents } from "@leanscope/ecs-engine";
import { usePlayer } from "./usePlayer";
import { PositionFacet } from "@leanscope/ecs-models";

export const useAccuratPlayerPosition = () => {
  const { playerEntity } = usePlayer();
  const [positionProps] = useEntityComponents(playerEntity, PositionFacet);
  const playerPositionX = positionProps?.props.positionX ?? 0;
  const playerPositionY = positionProps?.props.positionY ?? 0;

  return { playerPositionX, playerPositionY };
};
