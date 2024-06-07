import { Facet } from "@leanscope/ecs-engine";
import { Directions, FoodItems, ItemTypes, OtherItems } from "../base/enums";

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

export interface DirectionProps {
  direction: Directions;
}

export class DirectionFacet extends Facet<DirectionProps> {
  constructor(props: DirectionProps) {
    super(props);
  }
}

export interface ManaCountProps {
  manaCount: number;
}

export class ManaCountFacet extends Facet<ManaCountProps> {
  constructor(props: ManaCountProps) {
    super(props);
  }
}