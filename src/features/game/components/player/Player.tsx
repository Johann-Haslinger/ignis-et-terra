import { PositionProps } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";
import { Fragment } from "react/jsx-runtime";
import PlayerMovementSystem from "../../systems/PlayerMovementSystem";
import PlayerActionSystem from "../../systems/PlayerActionSystem";
import { PLAYER_SIZE } from "../../../../base/constants";

const Player = (props: PositionProps) => {
  const { positionX, positionY } = props;

  return (
    <Fragment>
      <PlayerMovementSystem />
      <PlayerActionSystem />

      <Box renderOrder={1} args={[PLAYER_SIZE.width, PLAYER_SIZE.height, 0]} position={[positionX, positionY, 0]}>
        <meshBasicMaterial depthTest={true} transparent color={"black"} />
      </Box>
    </Fragment>
  );
};

export default Player;
