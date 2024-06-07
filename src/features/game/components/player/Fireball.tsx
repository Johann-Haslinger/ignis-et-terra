import { PositionProps } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";
import { DirectionProps } from "../../../../app/gameFacets";

const Fireball = (props: PositionProps & DirectionProps) => {
  const { positionX, positionY } = props;
  return (
    <Box args={[0.7, 0.7, 0]} position={[positionX, positionY, 0]}>
      <meshBasicMaterial depthTest={true} transparent color={"red"} />
    </Box>
  );
};

export default Fireball;
