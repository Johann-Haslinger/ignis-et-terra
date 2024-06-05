import { PositionFacet } from "@leanscope/ecs-models";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { PLAYER_SMOTHNESS, PLAYER_SPEED } from "../../../base/constants";
import { usePlayer } from "../hooks/usePlayer";

const PlayerMovementSystem = () => {
  const { playerPositionX: positionX, playerPositionY: positionY, playerEntity } = usePlayer();
  const previousPositionRef = useRef([1, 1]);
  const movementRef = useRef([0, 0]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const lowerCaseKey = key.toLowerCase();

      if (lowerCaseKey === "s") {
        movementRef.current[1] = -PLAYER_SPEED;
      }
      if (lowerCaseKey === "w") {
        movementRef.current[1] = PLAYER_SPEED;
      }

      if (lowerCaseKey === "a") {
        movementRef.current[0] = -PLAYER_SPEED;
      }
      if (lowerCaseKey === "d") {
        movementRef.current[0] = PLAYER_SPEED;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      const lowerCaseKey = key.toLowerCase();

      if (lowerCaseKey === "s" || lowerCaseKey === "w") {
        movementRef.current[1] = 0;
      }

      if (lowerCaseKey === "a" || lowerCaseKey === "d") {
        movementRef.current[0] = 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [positionX, positionY, playerEntity]);

  useFrame(({ camera }) => {
    const [x, y] = [positionX, positionY];
    const [dx, dy] = movementRef.current;

    const smoothX = x + dx * PLAYER_SMOTHNESS;
    const smoothY = y + dy * PLAYER_SMOTHNESS;
    camera.position.x = smoothX;
    camera.position.y = smoothY;

    playerEntity?.add(new PositionFacet({ positionX: smoothX, positionY: smoothY, positionZ: 0 }));

    previousPositionRef.current = [smoothX, smoothY];
  });

  return null;
};

export default PlayerMovementSystem;
