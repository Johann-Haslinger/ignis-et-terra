import { useEffect } from "react";
import { useAccuratPlayerPosition } from "../hooks/useAccuratPlayerPosition";
import { useEntities } from "@leanscope/ecs-engine";
import { PositionFacet } from "@leanscope/ecs-models";
import { ItemTypeFacet } from "../../../app/gameFacets";
import { AdditionalTags } from "../../../base/enums";

const WorldItemsCollisionWithPlayerSystem = () => {
  const { playerPositionY, playerPositionX } = useAccuratPlayerPosition();
  const [wolrdItemEntities] = useEntities((e) => e.has(PositionFacet) && e.has(ItemTypeFacet));

  useEffect(() => {
    wolrdItemEntities.forEach((entity) => {
      const positionX = entity.get(PositionFacet)?.props.positionX ?? 0;
      const positionY = entity.get(PositionFacet)?.props.positionY ?? 0;

      const distance = Math.sqrt(Math.pow(playerPositionX - positionX, 2) + Math.pow(playerPositionY - positionY, 2));

      if (distance < 0.5) {
        entity.add(AdditionalTags.COLLIDING_WITH_PLAYER);
      }else {
        entity.remove(AdditionalTags.COLLIDING_WITH_PLAYER);
      }
    });
  }, [playerPositionX, playerPositionY]);

  return null;
};

export default WorldItemsCollisionWithPlayerSystem;
