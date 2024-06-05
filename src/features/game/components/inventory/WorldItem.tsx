import { EntityProps, useEntityHasTags } from "@leanscope/ecs-engine";
import { PositionProps } from "@leanscope/ecs-models";
import { Box } from "@react-three/drei";
import { useRef } from "react";
import { MeshBasicMaterial } from "three";
import { ItemTypeProps } from "../../../../app/gameFacets";
import { AdditionalTags } from "../../../../base/enums";
import { useFrame } from "@react-three/fiber";

const WorldItem = (props: PositionProps & ItemTypeProps & EntityProps) => {
  const { positionX, positionY, entity } = props;
  const [isCollidingWithPlayer] = useEntityHasTags(entity, AdditionalTags.COLLIDING_WITH_PLAYER);
  const meshRef = useRef<MeshBasicMaterial>(null);

  useFrame(() => {
    if (meshRef.current) {
      if (isCollidingWithPlayer) {
        meshRef.current.color.set("red");
      } else {
        meshRef.current.color.set("gray");
      }
    }
  });

  return (
    <Box args={[0.4, 0.4, 0]} position={[positionX, positionY, 0]}>
      <meshBasicMaterial ref={meshRef} depthTest={true} transparent color={"gray"} />
    </Box>
  );
};

export default WorldItem;
