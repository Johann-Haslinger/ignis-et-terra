import { useEffect } from "react";
import { useInventory } from "../hooks/useInventory";

const PlayerActionSystem = () => {
  const { isInventoryOpen, activateInventory, deactivateInventory } = useInventory();

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
  }, [isInventoryOpen]);

  return null;
};

export default PlayerActionSystem;
