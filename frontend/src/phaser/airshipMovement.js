import { PLAYER_SPEED, AIRSHIP_SHIP_HEIGHT, AIRSHIP_SHIP_WIDTH } from './constants';
import { airshipmapBounds } from './airshipmapBounds.js'; // need to change this to fit mira map

const isWithinMovementBoundaries = (x, y) => {
  return !airshipmapBounds[y] ? true : !airshipmapBounds[y].includes(x);
};

export const movePlayer = (keys, player) => {
  const absPlayerX = player.x + AIRSHIP_SHIP_WIDTH / 2;
  const absPlayerY = player.y + AIRSHIP_SHIP_HEIGHT / 2 + 20;
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