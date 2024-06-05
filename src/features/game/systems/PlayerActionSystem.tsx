import { useContext, useEffect } from "react";
import { useInventory } from "../hooks/useInventory";
import { LeanScopeClientContext } from "@leanscope/api-client/node";
import { usePlayer } from "../hooks/usePlayer";

const PlayerActionSystem = () => {
  const lsc = useContext(LeanScopeClientContext);
  const { isInventoryOpen, activateInventory, deactivateInventory } = useInventory();
  const { positionX } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const lowerCaseKey = key.toLowerCase();

      if (lowerCaseKey === "e") {
        if (isInventoryOpen) {
          deactivateInventory();
        } else {
          activateInventory();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isInventoryOpen, lsc, activateInventory, deactivateInventory, positionX]);

  return null;
};

export default PlayerActionSystem;
