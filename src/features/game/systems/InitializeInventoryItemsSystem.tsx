import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { Entity } from "@leanscope/ecs-engine";
import { IdentifierFacet } from "@leanscope/ecs-models";
import { useContext, useEffect } from "react";
import { ItemNameFacet, ItemTypeFacet } from "../../../app/gameFacets";
import { dummyInventoryItems } from "../../../base/dummy";

const InitializeInventoryItemsSystem = () => {
  const lsc = useContext(LeanScopeClientContext);

  useEffect(() => {
    const initializeWorldItems = async () => {
      const inventoryItems = dummyInventoryItems;

      inventoryItems.forEach(async (item) => {
        const isExisting = lsc.engine.entities.some((e) => e.get(IdentifierFacet)?.props.guid === item.id);

        if (!isExisting) {
          const newWorldItemEntity = new Entity();
          lsc.engine.addEntity(newWorldItemEntity);
          newWorldItemEntity.add(new IdentifierFacet({ guid: item.id }));
          newWorldItemEntity.add(new ItemTypeFacet({ itemType: item.itemType }));
          newWorldItemEntity.add(new ItemNameFacet({ itemName: item.itemName }));
        }
      });
    };

    initializeWorldItems();
  }, []);

  return null;
};

export default InitializeInventoryItemsSystem;
