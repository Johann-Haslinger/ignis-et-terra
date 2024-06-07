import { useEffect, useState } from "react";
import { usePlayer } from "./usePlayer";

interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

const isColliding = (rect1: Rectangle, rect2: Rectangle) => {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
};

const useCollisionDetection = (
  objectPosition: { x: number; y: number },
  objectSize: { width: number; height: number }
) => {
  const { playerPositionX: positionX, playerPositionY: positionY } = usePlayer();
  const playerSize = { width: 0.6, height: 0.6 };
  const [isCollidingWithPlayer, setIsCollidingWithPlayer] = useState(false);

  useEffect(() => {
    const playerRect = {
      x: positionX,
      y: positionY,
      width: playerSize.width,
      height: playerSize.height,
    };

    const objectRect = {
      x: objectPosition.x,
      y: objectPosition.y,
      width: objectSize.width,
      height: objectSize.height,
    };

    setIsCollidingWithPlayer(isColliding(playerRect, objectRect));
  }, [positionX, positionY, playerSize, objectPosition, objectSize]);

  return isCollidingWithPlayer;
};

export default useCollisionDetection;
