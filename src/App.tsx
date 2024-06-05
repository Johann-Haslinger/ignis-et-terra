import { useIsCurrentStory } from "@leanscope/storyboarding";
import { Map } from "./features/game";
import InitializePlayerSystem from "./features/game/systems/InitializePlayerSystem";
import InitializeStoriesSystem from "./features/game/systems/InitializeStoriesSystem";
import InitializeWorldItemsSystem from "./features/game/systems/InitializeWorldItemsSystem";
import { Stories } from "./base/enums";
import InitializeInventoryItemsSystem from "./features/game/systems/InitializeInventoryItemsSystem";

const App = () => {
  const isPlayGameStoryCurrent = useIsCurrentStory(Stories.PLAY_GAME_STORY);
  const isObservingInventory = useIsCurrentStory(Stories.OBSERVING_INVENTORY_STORY);
  return (
    <div>
      <InitializeStoriesSystem />
      <InitializePlayerSystem />
      <InitializeWorldItemsSystem />
      <InitializeInventoryItemsSystem />

      <Map />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: 20,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        }}
      >
        {isPlayGameStoryCurrent && <div>Play Game Story</div>}
        {isObservingInventory && <div>Observing Inventory</div>}
      </div>
    </div>
  );
};

export default App;
