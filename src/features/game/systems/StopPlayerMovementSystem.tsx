import { useEffect } from "react";
import { useAccuratPlayerPosition } from "../hooks/useAccuratPlayerPosition";

const chunkSize = 16;
const chunks = [
  { x: 0, y: 0, id: 0 },
  { x: 1, y: 0, id: 1 },
  { x: 0, y: 1, id: 2 },
  { x: 1, y: 1, id: 3 },
  { x: 2, y: 0, id: 4 },
  { x: 0, y: 2, id: 5 },
  { x: 2, y: 1, id: 6 },
  { x: 1, y: 2, id: 7 },
  { x: 2, y: 2, id: 8 },
];

const collisionMapsForChunks = [
  {
    chunkId: 0,
    collisionMap: [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
    ],
  },
];

const useCurrentChunk = () => {
  const { playerPositionX, playerPositionY } = useAccuratPlayerPosition();

  const currentChunk = chunks.find((chunk) => {
    return (
      playerPositionX >= chunk.x * chunkSize &&
      playerPositionX < (chunk.x + 1) * chunkSize &&
      playerPositionY >= chunk.y * chunkSize &&
      playerPositionY < (chunk.y + 1) * chunkSize
    );
  });
  return currentChunk;
};

const useCurrentChunkCollisionMap = () => {
  const currentChunk = useCurrentChunk();
  const collisionMap = collisionMapsForChunks.find((map) => map.chunkId === currentChunk?.id);
  return collisionMap;
};

const StopPlayerMovementSystem = () => {
  const collisionMap = useCurrentChunkCollisionMap();
  const currentChunk = useCurrentChunk();
  const { playerPositionX, playerPositionY } = useAccuratPlayerPosition();

  useEffect(() => {
    if (!collisionMap) {
      return;
    }

    const playerChunkPositionX = playerPositionX % chunkSize;
    const playerChunkPositionY = playerPositionY % chunkSize;

    const playerTileX = Math.floor(playerChunkPositionX / 1);
    const playerTileY = Math.floor(playerChunkPositionY / 1);

    if (collisionMap.collisionMap[playerTileY][playerTileX] === 1) {
      console.log("Player is colliding with a wall");
    }
  }, [playerPositionX, playerPositionY, currentChunk, collisionMap]);

  return null;
};

export default StopPlayerMovementSystem;
