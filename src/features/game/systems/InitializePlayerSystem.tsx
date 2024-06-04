import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { Entity } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { useContext, useEffect } from "react";
import { PLAYER_START_POSITION } from "../../../base/constants";
import { AdditionalTags } from "../../../base/enums";

const InitializePlayerSystem = () => {
  const lsc = useContext(LeanScopeClientContext);

  useEffect(() => {
    if (!lsc.engine.entities.some((e) => e.hasTag(AdditionalTags.PLAYER))) {
      const newPlayerEntity = new Entity();
      lsc.engine.addEntity(newPlayerEntity);
      newPlayerEntity.add(
        new PositionFacet({ positionX: PLAYER_START_POSITION.x, positionY: PLAYER_START_POSITION.y, positionZ: 0 })
      );
      newPlayerEntity.add(new IdentifierFacet({ guid: "player" }));
      newPlayerEntity.addTag(AdditionalTags.PLAYER);
    }
  }, [lsc]);

  return null;
};

export default InitializePlayerSystem;
