import { useEntities } from "@leanscope/ecs-engine";
import { PositionFacet } from "@leanscope/ecs-models";
import { useFrame } from "@react-three/fiber";
import { DirectionFacet } from "../../../app/gameFacets";
import { AdditionalTags } from "../../../base/enums";
import { useContext } from "react";
import { LeanScopeClientContext } from "@leanscope/api-client/node";

const UpdateFireballPositionSystem = () => {
  const lsc = useContext(LeanScopeClientContext);
  const [fireballEntities] = useEntities((e) => e.has(AdditionalTags.FIREBALL));

  useFrame(() => {
    fireballEntities.forEach((fireballEntity) => {
      const fireballPosition = fireballEntity.get(PositionFacet);
      const fireballDirection = fireballEntity.get(DirectionFacet)?.props.direction;
      const fireballSpeed = 0.1;

      console.log(fireballPosition, fireballDirection);
      let newPositionX = fireballPosition?.props.positionX || 0;
      let newPositionY = fireballPosition?.props.positionY || 0;

      if (fireballPosition && fireballDirection) {
        const { positionX, positionY } = fireballPosition.props;
        if (fireballDirection === "up") {
          newPositionY = positionY + fireballSpeed;
        }
        if (fireballDirection === "down") {
          newPositionY = positionY - fireballSpeed;
        }
        if (fireballDirection === "left") {
          newPositionX = positionX - fireballSpeed;
        }
        if (fireballDirection === "right") {
          newPositionX = positionX + fireballSpeed;
        }
        if (fireballDirection === "up_right") {
          newPositionX = positionX + fireballSpeed / 1.5;
          newPositionY = positionY + fireballSpeed / 1.5;
        }
        if (fireballDirection === "up_left") {
          newPositionX = positionX - fireballSpeed / 1.5;
          newPositionY = positionY + fireballSpeed / 1.5;
        }
        if (fireballDirection === "down_right") {
          newPositionX = positionX + fireballSpeed / 1.5;
          newPositionY = positionY - fireballSpeed /1.5;
        }
        if (fireballDirection === "down_left") {
          newPositionX = positionX - fireballSpeed / 1.5;
          newPositionY = positionY - fireballSpeed / 1.5;
        }

        fireballEntity.add(new PositionFacet({ positionX: newPositionX, positionY: newPositionY, positionZ: 0 }));
      }

      if (fireballEntity) setTimeout(() => lsc.engine.removeEntity(fireballEntity), 600);
    });
  });

  return null;
};

export default UpdateFireballPositionSystem;
