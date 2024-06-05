import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { IdentifierFacet, PositionFacet } from "@leanscope/ecs-models";
import { useContext, useEffect } from "react";
import { dummyWorldItems } from "../../../base/dummy";
import { Entity } from "@leanscope/ecs-engine";
import { ItemNameFacet, ItemTypeFacet } from "../../../app/gameFacets";

const InitializeWorldItemsSystem = () => {
  const lsc = useContext(LeanScopeClientContext);

  useEffect(() => {
    const initializeWorldItems = async () => {
      const worldItems = dummyWorldItems;

      worldItems.forEach(async (item) => {
        const isExisting = lsc.engine.entities.some((e) => e.get(IdentifierFacet)?.props.guid === item.id);

        if (!isExisting) {
          const newWorldItemEntity = new Entity();
          lsc.engine.addEntity(newWorldItemEntity);
          newWorldItemEntity.add(new IdentifierFacet({ guid: item.id }));
          newWorldItemEntity.add(
            new PositionFacet({ positionX: item.positionX, positionY: item.positionY, positionZ: 0 })
          );
          newWorldItemEntity.add(new ItemTypeFacet({ itemType: item.itemType }));
          newWorldItemEntity.add(new ItemNameFacet({ itemName: item.itemName }));
          
        }
      });
    };

    if (lsc) initializeWorldItems();
  }, []);

  return null;
};

export default InitializeWorldItemsSystem;
