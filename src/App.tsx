import { Directions } from "./base/enums";
import { Map } from "./features/game";
import { usePlayer } from "./features/game/hooks/usePlayer";
import DeleteNotificationsSystem from "./features/game/systems/DeleteNotificationsSystem";
import InitializeInventoryItemsSystem from "./features/game/systems/InitializeInventoryItemsSystem";
import InitializePlayerSystem from "./features/game/systems/InitializePlayerSystem";
import InitializeStoriesSystem from "./features/game/systems/InitializeStoriesSystem";
import InitializeWorldItemsSystem from "./features/game/systems/InitializeWorldItemsSystem";

const getPlayerDirection = (direction?: Directions) => {
  switch (direction) {
    case Directions.UP:
      return "UP";
    case Directions.UP_RIGHT:
      return "UP_RIGHT";
    case Directions.RIGHT:
      return "RIGHT";
    case Directions.DOWN_RIGHT:
      return "DOWN_RIGHT";
    case Directions.DOWN:
      return "DOWN";
    case Directions.DOWN_LEFT:
      return "DOWN_LEFT";
    case Directions.LEFT:
      return "LEFT";
    case Directions.UP_LEFT:
      return "UP_LEFT";
    default:
      return "NO_DIRECTION";
  }
};

const App = () => {
  const { playerDirection } = usePlayer();
  return (
    <div>
      <InitializeStoriesSystem />
      <InitializePlayerSystem />
      <InitializeWorldItemsSystem />
      <InitializeInventoryItemsSystem />
      <DeleteNotificationsSystem />

      <Map />

      <div style={{ position: "absolute", bottom: 0, right: 0 }}>{getPlayerDirection(playerDirection)}</div>
    </div>
  );
};

export default App;
