import { PositionProps } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";

const Player = (props: PositionProps) => {
  const { positionX, positionY } = props;

  return (
    <Box args={[1, 1, 0]} position={[positionX, positionY, 0]}>
      <meshBasicMaterial depthTest={true} transparent color={"black"} />
    </Box>
  );
};

export default Player;
