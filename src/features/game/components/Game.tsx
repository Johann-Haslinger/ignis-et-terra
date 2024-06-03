import InitializePlayerSystem from "../systems/InitializePlayerSystem";
import Map from "./map/Map";

const Game = () => {
  return (
    <div>
      <InitializePlayerSystem />
      <Map />
    </div>
  );
};

export default Game;
