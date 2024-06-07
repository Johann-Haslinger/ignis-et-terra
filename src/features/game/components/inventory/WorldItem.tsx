import { EntityProps, useEntityHasTags } from "@leanscope/ecs-engine";
import { PositionProps } from "@leanscope/ecs-models";
import { Box, Text } from "@react-three/drei";
import { ItemTypeProps } from "../../../../app/gameFacets";
import { AdditionalTags } from "../../../../base/enums";

const WorldItem = (props: PositionProps & ItemTypeProps & EntityProps) => {
  const { positionX, positionY, entity } = props;
  const [isCollidingWithPlayer] = useEntityHasTags(entity, AdditionalTags.COLLIDING_WITH_PLAYER);

  return (
    <group>
      <Box args={[0.7, 0.7, 0]} position={[positionX, positionY, 0]}>
        <meshBasicMaterial depthTest={true} transparent color={isCollidingWithPlayer ? "red" : "gray"} />
      </Box>
      <Box
        args={[0.4, 0.4, 0]}
        renderOrder={2}
        position-z={0.01}
        position={[positionX, positionY + 0.7, 0]}
        visible={isCollidingWithPlayer}
      >
        <meshBasicMaterial depthTest={false} transparent color={"blue"} />
        <Text scale={0.3} renderOrder={3} position-z={0.02}>
          e
        </Text>
      </Box>
    </group>
  );
};

export default WorldItem;
