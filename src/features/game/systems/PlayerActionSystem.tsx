import { ILeanScopeClient } from "@leanscope/api-client/interfaces";
import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { Entity } from "@leanscope/ecs-engine";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { useContext, useEffect } from "react";
import { DirectionFacet, ItemNameFacet, ItemTypeFacet, ManaCountFacet } from "../../../app/gameFacets";
import { AdditionalTags } from "../../../base/enums";
import { useInventory } from "../hooks/useInventory";

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
  }
};

const attack = (lsc: ILeanScopeClient) => {
  const playerEntity = lsc.engine.entities.find((e) => e.get(IdentifierFacet)?.props.guid === "player");
  const playerPosition = playerEntity?.get(PositionFacet);
  const playerX = playerPosition?.props.positionX || 0;
  const playerY = playerPosition?.props.positionY || 0;
  const playerDirection = playerEntity?.get(DirectionFacet)?.props.direction;
  const playerManaCount = playerEntity?.get(ManaCountFacet)?.props.manaCount;

  if (playerDirection && playerManaCount && playerManaCount !== 0) {
    const newFireballEntity = new Entity();
    lsc.engine.addEntity(newFireballEntity);
    newFireballEntity.add(AdditionalTags.FIREBALL);
    newFireballEntity.add(new PositionFacet({ positionX: playerX, positionY: playerY, positionZ: 0 }));
    newFireballEntity.add(new DirectionFacet({ direction: playerDirection }));
    playerEntity?.add(new ManaCountFacet({ manaCount: playerManaCount - 1 }));
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
      } else if (lowerCaseKey === "f") {
        attack(lsc);
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
