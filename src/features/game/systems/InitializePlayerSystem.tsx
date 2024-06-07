import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { Entity } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { useContext, useEffect } from "react";
import { DirectionFacet, HealthCountFacet, ManaCountFacet, MaxHealthCountFacet } from "../../../app/gameFacets";
import { PLAYER_START_MAX_HEALTH, PLAYER_START_POSITION } from "../../../base/constants";
import { Directions } from "../../../base/enums";

const InitializePlayerSystem = () => {
  const lsc = useContext(LeanScopeClientContext);

  useEffect(() => {
    const newPlayerEntity = new Entity();
    lsc.engine.addEntity(newPlayerEntity);
    newPlayerEntity.add(
      new PositionFacet({ positionX: PLAYER_START_POSITION.x, positionY: PLAYER_START_POSITION.y, positionZ: 0 })
    );
    newPlayerEntity.add(new IdentifierFacet({ guid: "player" }));
    newPlayerEntity.add(new DirectionFacet({ direction: Directions.DOWN }));
    newPlayerEntity.add(new ManaCountFacet({ manaCount: 5 }));
    newPlayerEntity.add(new HealthCountFacet({ healthCount: 2 }));
    newPlayerEntity.add(new MaxHealthCountFacet({ maxHealthCount: PLAYER_START_MAX_HEALTH }));

    return () => {
      lsc.engine.removeEntity(newPlayerEntity);
    };
  }, []);

  return null;
};

export default InitializePlayerSystem;
