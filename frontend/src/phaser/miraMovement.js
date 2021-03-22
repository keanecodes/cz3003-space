import { PLAYER_SPEED, MIRA_SHIP_HEIGHT, MIRA_SHIP_WIDTH } from './constants';
import { miramapBounds } from './miramapBounds.js'; // need to change this to fit mira map

const isWithinMovementBoundaries = (x, y) => {
  return !miramapBounds[y] ? true : !miramapBounds[y].includes(x);
};

export const miraMovePlayer = (keys, player) => {
  const absPlayerX = player.x + MIRA_SHIP_WIDTH / 2;
  const absPlayerY = player.y + MIRA_SHIP_HEIGHT / 2 + 20;
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