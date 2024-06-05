import { ItemTypes, FoodItems, OtherItems } from "./enums";

export const dummyWorldItems = [
  { positionX: 1, positionY: 1, itemType: ItemTypes.FOOD, itemName: FoodItems.APPLE, id: "1" },
];
export const dummyInventoryItems = [
  { itemType: ItemTypes.FOOD, itemName: FoodItems.APPLE, id: "10" },
  { itemType: ItemTypes.FOOD, itemName: FoodItems.APPLE, id: "11" },
  { itemType: ItemTypes.OTHER, itemName: OtherItems.STONE, id: "12" }
];
