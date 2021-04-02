import skeld from '../assets/ship.png';
import mira from '../assets/miraResize.png';
import polus from '../assets/polusResize.png';
import airship from '../assets/airshipResize1.png';
import island from '../assets/islandmapResize.png';
import MiraGame from '../phaser/miraScene';
import MyGame from '../phaser/scene';
import PolusGame from '../phaser/polusScene';


export const MapIdMap = {
  "skeld": {
    label: "The Skeld",
    map: skeld,
    scene: MyGame,
  },
  "mira": {
    label: "Mira HQ",
    map: mira,
    scene: MiraGame,
  },
  "polus": {
    label: "Polus",
    map: polus,
    scene: PolusGame,
  },
  "airship": {
    label: "Airship",
    map: airship,
    scene: AirshipGame,
  },
  "island": {
    label: "Island",
    map: island,
    scene: IslandGame,
  },
}