import { PLAYER_SPEED, ISLAND_SHIP_HEIGHT, ISLAND_SHIP_WIDTH } from './constants';
import { islandmapBounds } from './islandmapBounds';

const isWithinMovementBoundaries = (x, y) => {
  return !islandmapBounds[y] ? true : !islandmapBounds[y].includes(x);
};

export const movePlayer = (keys, player) => {
  const absPlayerX = player.x + ISLAND_SHIP_WIDTH / 2;
  const absPlayerY = player.y + ISLAND_SHIP_HEIGHT / 2 + 20;
  if (
    keys.includes('ArrowUp') &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY - PLAYER_SPEED)
  ) {
    player.y = player.y - PLAYER_SPEED;
  }
  if (
    keys.includes('ArrowDown') &&
    isWithinMovementBoundaries(absPlayerX, absPlayerY + PLAYER_SPEED)
  ) {
    player.y = player.y + PLAYER_SPEED;
  }
  if (
    keys.includes('ArrowLeft') &&
    isWithinMovementBoundaries(absPlayerX - PLAYER_SPEED, absPlayerY)
  ) {
    player.x = player.x - PLAYER_SPEED;
    player.list[0].flipX = true;
  }
  if (
    keys.includes('ArrowRight') &&
    isWithinMovementBoundaries(absPlayerX + PLAYER_SPEED, absPlayerY)
  ) {
    player.x = player.x + PLAYER_SPEED;
    player.list[0].flipX = false;
  }
};