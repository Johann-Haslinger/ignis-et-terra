import { Map } from "./features/game";
import CollectItemNotifications from "./features/game/components/status/CollectItemNotification";
import DeleteNotificationsSystem from "./features/game/systems/DeleteNotificationsSystem";
import InitializeInventoryItemsSystem from "./features/game/systems/InitializeInventoryItemsSystem";
import InitializePlayerSystem from "./features/game/systems/InitializePlayerSystem";
import InitializeStoriesSystem from "./features/game/systems/InitializeStoriesSystem";
import InitializeWorldItemsSystem from "./features/game/systems/InitializeWorldItemsSystem";

const App = () => {
  return (
    <div>
      <InitializeStoriesSystem />
      <InitializePlayerSystem />
      <InitializeWorldItemsSystem />
      <InitializeInventoryItemsSystem />
      <DeleteNotificationsSystem />

      <Map />
      
      <CollectItemNotifications />
    </div>
  );
};

export default App;
