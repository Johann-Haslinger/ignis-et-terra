import { PositionFacet } from "@leanscope/ecs-models";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { PLAYER_SMOTHNESS, PLAYER_SPEED } from "../../../base/constants";
import { Directions } from "../../../base/enums";
import { usePlayer } from "../hooks/usePlayer";
import { DirectionFacet } from "../../../app/gameFacets";

const PlayerMovementSystem = () => {
  const { playerPositionX: positionX, playerPositionY: positionY, playerEntity } = usePlayer();
  const previousPositionRef = useRef([1, 1]);
  const movementRef = useRef([0, 0]);
  const [currentDirection, setCurrentDirection] = useState<Directions | null>(null);

  useEffect(() => {
    if (currentDirection) {
      console.log("add New Direction", currentDirection);
      playerEntity?.add(new DirectionFacet({ direction: currentDirection }));
    }
  }, [currentDirection, playerEntity]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      const lowerCaseKey = key.toLowerCase();

      switch (lowerCaseKey) {
        case "w":
          setCurrentDirection((current) => {
            if (current === Directions.RIGHT) return Directions.UP_RIGHT;
            if (current === Directions.LEFT) return Directions.UP_LEFT;
            return Directions.UP;
          });
          movementRef.current[1] = PLAYER_SPEED;
          break;
        case "a":
          setCurrentDirection((current) => {
            if (current === Directions.DOWN) return Directions.DOWN_LEFT;
            if (current === Directions.UP) return Directions.UP_LEFT;
            return Directions.LEFT;
          });
          movementRef.current[0] = -PLAYER_SPEED;
          break;
        case "s":
          setCurrentDirection((current) => {
            if (current === Directions.RIGHT) return Directions.DOWN_RIGHT;
            if (current === Directions.LEFT) return Directions.DOWN_LEFT;
            return Directions.DOWN;
          });
          movementRef.current[1] = -PLAYER_SPEED;
          break;
        case "d":
          setCurrentDirection((current) => {
            if (current === Directions.UP) return Directions.UP_RIGHT;
            if (current === Directions.DOWN) return Directions.DOWN_RIGHT;
            return Directions.RIGHT;
          });
          movementRef.current[0] = PLAYER_SPEED;
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      const lowerCaseKey = key.toLowerCase();

      switch (lowerCaseKey) {
        case "w":
        case "s":
          movementRef.current[1] = 0;
          break;
        case "a":
        case "d":
          movementRef.current[0] = 0;
          break;
        default:
          break;
      }

      // Reset current direction if both vertical and horizontal movement keys are released
      if (
        (lowerCaseKey === "w" || lowerCaseKey === "s") &&
        (currentDirection === Directions.UP || currentDirection === Directions.DOWN)
      ) {
        setCurrentDirection(null);
      }
      if (
        (lowerCaseKey === "a" || lowerCaseKey === "d") &&
        (currentDirection === Directions.LEFT || currentDirection === Directions.RIGHT)
      ) {
        setCurrentDirection(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [positionX, positionY, playerEntity, currentDirection]);
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
