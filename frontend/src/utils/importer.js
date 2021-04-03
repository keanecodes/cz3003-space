import playerSprite from '../assets/player.png';
import pBLK from '../assets/pBLK.png';
import pBLU from '../assets/pBLU.png';
import pGRN from '../assets/pGRN.png';
import pORG from '../assets/pORG.png';
import pRED from '../assets/pRED.png';
import pWHT from '../assets/pWHT.png';
import pYLW from '../assets/pYLW.png';

import mSKD from '../assets/ship.png'
import mMRA from '../assets/miraResize.png'
import mPLS from '../assets/polusResize.png'
import mASP from '../assets/airshipResize1.png'
import mILD from '../assets/islandmapResize.png'

import {
  SKELD_PLAYER_START_X,
  SKELD_PLAYER_START_Y,
  MIRA_PLAYER_START_X,
  MIRA_PLAYER_START_Y,
  POLUS_PLAYER_START_X,
  POLUS_PLAYER_START_Y,
  AIRSHIP_PLAYER_START_X,
  AIRSHIP_PLAYER_START_Y,
  ISLAND_PLAYER_START_X,
  ISLAND_PLAYER_START_Y
} from "../phaser/constants";

export const spriteIdMap = {
  "npc": {
    label: "player",
    sprite: playerSprite
  },
  "pRED": {
    label: "Red",
    sprite: pRED
  },
  "pBLU": {
    label: "Blue",
    sprite: pBLU
  },
  "pBLK": {
    label: "Black",
    sprite: pBLK
  },
  "pYLW": {
    label: "Yellow",
    sprite: pYLW
  },
  "pGRN": {
    label: "Green",
    sprite: pGRN
  },
  "pORG": {
    label: "Orange",
    sprite: pORG
  },
  "pWHT": {
    label: "White",
    sprite: pWHT
  }
}

export const sceneIdMap = {
  "The Skeld": {
    startX: SKELD_PLAYER_START_X,
    startY: SKELD_PLAYER_START_Y,
    img: mSKD
  },
  "Mira HQ": {
    startX: MIRA_PLAYER_START_X,
    startY: MIRA_PLAYER_START_Y,
    img: mMRA
  },
  "Polus": {
    startX: POLUS_PLAYER_START_X,
    startY: POLUS_PLAYER_START_Y,
    img: mPLS
  },
  "Airship": {
    startX: AIRSHIP_PLAYER_START_X,
    startY: AIRSHIP_PLAYER_START_Y,
    img: mASP
  },
  "Island": {
    startX: ISLAND_PLAYER_START_X,
    startY: ISLAND_PLAYER_START_Y,
    img: mILD
  }
}