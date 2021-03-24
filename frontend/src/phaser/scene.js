import Phaser from 'phaser';
import shipImg from '../assets/ship.png';
import playerSprite from '../assets/player.png';
import pBLK from '../assets/pBLK.png';
import pBLU from '../assets/pBLU.png';
import pGRN from '../assets/pGRN.png';
import pORG from '../assets/pORG.png';
import pRED from '../assets/pRED.png';
import pWHT from '../assets/pWHT.png';
import pYLW from '../assets/pYLW.png';
import {
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_START_X,
  PLAYER_START_Y,
} from "./constants";
import { movePlayer } from "./movement";
import { animateMovement } from "./animation";

import firebase from "firebase/app";
import "firebase/database";
import { firebaseConfig } from "../recoil/config";

const player = {};
let pressedKeys = [];
const npc = {};

class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.database = firebase.database();
    this.roomNumber = Math.random().toString().split('.')[1];
    this.playerId = Math.random().toString().split('.')[1];
    this.playerName = "";
    this.roomAddress = "";
    this.sprite = "pWHT";
    this.previousX = 0;
    this.previousY = 0;
    this.updatePlayerPositions.bind(this.updatePlayerPositions);
    this.allPlayers = {};
  }

  preload() {
    this.load.image("ship", shipImg);
    this.load.spritesheet("player", playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet("npc", playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pBLK', pBLK, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pBLU', pBLU, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pGRN', pGRN, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pORG', pORG, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pRED', pRED, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pWHT', pWHT, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    this.load.spritesheet('pYLW', pYLW, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });

    console.log(this.database);
    if (this.game.config.user) {
      this.playerId = this.game.config.user.userId;
      this.playerName = this.game.config.user.displayName;
      this.playerSpriteColor = this.game.config.user.sprite;
      // console.log(this.playerSprite)
    }
  }

  create() {
    const ship = this.add.image(0, 0, 'ship');
    player.sprite = this.add.container(PLAYER_START_X, PLAYER_START_Y)
    var sprite = this.add.sprite(0, 0, this.playerSpriteColor);
    sprite.displayHeight = PLAYER_HEIGHT;
    sprite.displayWidth = PLAYER_WIDTH;

    npc.sprite = this.add.container(PLAYER_START_X, PLAYER_START_Y);
    var npcsprite1 = this.add.sprite(-500, -50, "npc");
    npcsprite1.displayHeight = PLAYER_HEIGHT;
    npcsprite1.displayWidth = PLAYER_WIDTH;
    var npcName1 = this.add.text(-500, -50, "Question Master");
    npcName1.font = "Arial";
    npcName1.setOrigin(0.5, 2.3);

    npc.sprite.add(npcsprite1);
    npc.sprite.add(npcName1);

    var txtName = this.add.text(0, 0, this.playerName);
    txtName.font = "Arial";
    txtName.setOrigin(0.5, 2.3);
    player.sprite.add(sprite);
    player.sprite.add(txtName);

    this.physics.world.enable(npcsprite1);
    this.physics.world.enable(sprite);

    npcsprite1.body.onWorldBounds = true;

    this.physics.add.collider(sprite, npcsprite1, function (npcsprite1) {
      console.log("Collided with npc");
      // insert pop up for qsn here
    });

    this.anims.create({
      key: "running",
      frames: this.anims.generateFrameNumbers("player"),
      frameRate: 24,
      reapeat: -1,
    });
    this.anims.create({
      key: 'runpBLK',
      frames: this.anims.generateFrameNumbers('pBLK'),
      frameRate: 24,
      reapeat: -1,
    });
    this.anims.create({
      key: 'runpGRN',
      frames: this.anims.generateFrameNumbers('pGRN'),
      frameRate: 24,
      reapeat: -1,
    });
    this.anims.create({
      key: 'runpGRN',
      frames: this.anims.generateFrameNumbers('pGRN'),
      frameRate: 24,
      reapeat: -1,
    });
    this.anims.create({
      key: 'runpORG',
      frames: this.anims.generateFrameNumbers('pORG'),
      frameRate: 24,
      reapeat: -1,
    });
    this.anims.create({
      key: 'runpRED',
      frames: this.anims.generateFrameNumbers('pRED'),
      frameRate: 24,
      reapeat: -1,
    });

    this.anims.create({
      key: 'runpWHT',
      frames: this.anims.generateFrameNumbers('pWHT'),
      frameRate: 24,
      reapeat: -1,
    });

    this.anims.create({
      key: 'runpYLW',
      frames: this.anims.generateFrameNumbers('pYLW'),
      frameRate: 24,
      reapeat: -1,
    });

    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    this.roomAddress = 'rooms/' + this.roomNumber + '/players/';

    var thisPlayerRef = firebase.database().ref(this.roomAddress + this.playerId);
    thisPlayerRef.onDisconnect().set({});
    var playersRef = firebase.database().ref(this.roomAddress);
    playersRef.on('value', (snapshot) => {
      this.updatePlayerPositions(snapshot.val());
    });
  }

  updatePlayerPositions(data) {
    Object.keys(this.allPlayers).forEach((characterKey) => {
      if (!data[characterKey]) {
        this.allPlayers[characterKey].sprite.destroy();
      }
    });

    Object.keys(data).forEach((characterKey) => {
      if (this.allPlayers[characterKey] && characterKey != this.playerId) {
        const incomingData = data[characterKey];
        const existingCharacter = this.allPlayers[characterKey];

        if (incomingData.moving) {
          existingCharacter.sprite.list[0].play("running", true);
          existingCharacter.sprite.x = incomingData.x;
          existingCharacter.sprite.y = incomingData.y;
          existingCharacter.sprite.list[0].play(incomingData.spriteAnim, true);
          existingCharacter.sprite.list[0].flipX = incomingData.flipX;
        }

      } else if (!this.allPlayers[characterKey] && characterKey != this.playerId) {
        const newCharacterData = data[characterKey];
        var newCharacter = {};
        newCharacter.sprite = this.add.container(newCharacterData.x, newCharacterData.y)
        var spriteConfig = this.add.sprite(0, 0, newCharacterData.spriteColor);
        spriteConfig.displayHeight = PLAYER_HEIGHT;
        spriteConfig.displayWidth = PLAYER_WIDTH;
        var txtNameConfig = this.add.text(0, 0, newCharacterData.playerName);
        txtNameConfig.font = "Arial";
        txtNameConfig.setOrigin(0.5, 2.3);
        newCharacter.sprite.add(spriteConfig);
        newCharacter.sprite.add(txtNameConfig);
        this.allPlayers[characterKey] = newCharacter;
      } else {
      }
    });
  }

  update() {
    this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
    movePlayer(pressedKeys, player.sprite);
    animateMovement("run" + player.sprite.list[0].texture.key, pressedKeys, player.sprite.list[0]);

    if (Math.round(player.sprite.x) != this.previousX || Math.round(player.sprite.y) != this.previousY) {
      firebase.database().ref(this.roomAddress + this.playerId).set({
        playerId: this.playerId, 
        playerName: this.playerName,
        spriteAnim: "run" + player.sprite.list[0].texture.key,
        spriteColor: player.sprite.list[0].texture.key,
        x: Math.round(player.sprite.x), 
        y: Math.round(player.sprite.y),
        flipX: player.sprite.list[0].flipX,
        moving: true
      });
    } else {
      firebase.database().ref(this.roomAddress + this.playerId).update({ moving: false})
    }

    this.previousX = Math.round(player.sprite.x);
    this.previousY = Math.round(player.sprite.y);
  }
}

export default MyGame;
