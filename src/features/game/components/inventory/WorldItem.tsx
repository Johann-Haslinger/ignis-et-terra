import { PositionProps } from "@leanscope/ecs-models";
import { ItemTypeProps } from "../../../../app/gameFacets";
import { Box } from "@react-three/drei";

const WorldItem = (props: PositionProps & ItemTypeProps) => {
  const { positionX, positionY } = props;

  return (
    <Box args={[0.4, 0.4, 0]} position={[positionX, positionY, 0]}>
      <meshBasicMaterial depthTest={true} transparent color={"gray"} />
    </Box>
  );
};

export default WorldItem;
