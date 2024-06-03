import { PositionProps } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";
import PlayerMovementSystem from "../../systems/PlayerMovementSystem";
import { Fragment } from "react/jsx-runtime";

const Player = (props: PositionProps) => {
  const { positionX, positionY } = props;

  return (
    <Fragment>
      <PlayerMovementSystem />

      <Box args={[0.6, 0.6, 0]} position={[positionX, positionY, 0]}>
        <meshBasicMaterial depthTest={true} transparent color={"black"} />
      </Box>
      
    </Fragment>
  );
};

export default Player;
