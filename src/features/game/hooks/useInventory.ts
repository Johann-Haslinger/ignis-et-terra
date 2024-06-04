import { useIsStoryCurrent } from "@leanscope/storyboarding";
import { Stories } from "../../../base/enums";
import { useContext } from "react";
import { LeanScopeClientContext } from "@leanscope/api-client/node";

export const useInventory = () => {
  const lsc = useContext(LeanScopeClientContext);
  const isInventoryOpen = useIsStoryCurrent(Stories.OBSERVING_INVENTORY_STORY);

  const activateInventory = () => {
    lsc.stories.transitTo(Stories.OBSERVING_INVENTORY_STORY);
  };
  const deactivateInventory = () => {
    lsc.stories.transitTo(Stories.PLAY_GAME_STORY);
  };

  return { isInventoryOpen, activateInventory, deactivateInventory };
};
