import { Map } from "./features/game";
import InitializePlayerSystem from "./features/game/systems/InitializePlayerSystem";
import InitializeStoriesSystem from "./features/game/systems/InitializeStoriesSystem";
import InitializeWorldItemsSystem from "./features/game/systems/InitializeWorldItemsSystem";

const App = () => {
  return (
    <div>
      <InitializeStoriesSystem />
      <InitializePlayerSystem />
      <InitializeWorldItemsSystem />

      <Map />
    </div>
  );
};

export default App;
