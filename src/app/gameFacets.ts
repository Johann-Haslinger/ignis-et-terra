import { Facet } from "@leanscope/ecs-engine";
import { FoodItems, ItemTypes, OtherItems } from "../base/enums";

export interface ItemTypeProps {
  itemType: ItemTypes;
}

export class ItemTypeFacet extends Facet<ItemTypeProps> {
  constructor(props: ItemTypeProps) {
    super(props);
  }
}

export interface ItemNameProps {
  itemName: FoodItems | OtherItems;
}

export class ItemNameFacet extends Facet<ItemNameProps> {
  constructor(props: ItemNameProps) {
    super(props);
  }
}