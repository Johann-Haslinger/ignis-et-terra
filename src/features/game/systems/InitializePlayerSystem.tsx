import { Entity } from "@leanscope/ecs-engine";
import { useContext, useEffect } from "react";
import { AdditionalTags } from "../../../base/constants";
import { PositionFacet } from "@leanscope/ecs-models";
import { LeanScopeClientContext } from "@leanscope/api-client/node";

const InitializePlayerSystem = () => {
  const lsc = useContext(LeanScopeClientContext);

  useEffect(() => {
    const newplayerEntity = new Entity();
    lsc.engine.addEntity(newplayerEntity);
    newplayerEntity.add(new PositionFacet({ positionX: 0, positionY: 0, positionZ: 0 }));
    newplayerEntity.addTag(AdditionalTags.PLAYER);
  }, []);

  return null;
};

export default InitializePlayerSystem;
