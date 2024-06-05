import { FoodItems, OtherItems } from "../../../base/enums";

export const displayItemName = (item?: FoodItems | OtherItems) => {
  switch (item) {
    case FoodItems.APPLE:
      return "Apple";
    case OtherItems.STONE:
      return "Stone";
    default:
      return "Unknown";
  }
};
