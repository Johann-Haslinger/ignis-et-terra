import { ILeanScopeClient } from "@leanscope/api-client/interfaces";
import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { useContext, useEffect } from "react";
import { ItemNameFacet, ItemTypeFacet } from "../../../app/gameFacets";
import { AdditionalTags } from "../../../base/enums";
import { useInventory } from "../hooks/useInventory";
import { PositionFacet } from "@leanscope/ecs-models";
import { Entity } from "@leanscope/ecs-engine";

const collectItem = (lsc: ILeanScopeClient) => {
  const collectableWorldItemEntities = lsc.engine.entities.filter(
    (e) => e.has(AdditionalTags.COLLIDING_WITH_PLAYER) && e.has(ItemTypeFacet) && e.has(PositionFacet)
  );
  const worldItemEntityToColllect = collectableWorldItemEntities[0];
  if (worldItemEntityToColllect) {
    worldItemEntityToColllect.remove(PositionFacet);
    const itemName = worldItemEntityToColllect.get(ItemNameFacet)?.props.itemName;

    const newCollectItemNotificationEntity = new Entity();
    lsc.engine.addEntity(newCollectItemNotificationEntity);
    newCollectItemNotificationEntity.add(AdditionalTags.NOTIFICATION);
    (itemName || itemName == 0) && newCollectItemNotificationEntity.add(new ItemNameFacet({ itemName: itemName }));

    console.log("add new notification", itemName);
  }
};

const PlayerActionSystem = () => {
  const lsc = useContext(LeanScopeClientContext);
  const { isInventoryOpen, activateInventory, deactivateInventory } = useInventory();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const lowerCaseKey = key.toLowerCase();

      if (lowerCaseKey === "i") {
        if (isInventoryOpen) {
          deactivateInventory();
        } else {
          activateInventory();
        }
      } else if (lowerCaseKey === "e") {
        collectItem(lsc);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInventoryOpen, lsc, activateInventory, deactivateInventory]);

  return null;
};

export default PlayerActionSystem;
