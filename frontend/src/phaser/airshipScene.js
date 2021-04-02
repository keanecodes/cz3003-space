import Phaser from 'phaser';
import shipImg from '../assets/airshipResize1.png';
import playerSprite from '../assets/player.png';
import {
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  AIRSHIP_PLAYER_START_X,
  AIRSHIP_PLAYER_START_Y,
} from './constants';
import { movePlayer } from './airshipMovement';
import { miraAnimateMovement } from './animation';

import firebase from 'firebase/app';
import 'firebase/database';
import { firebaseConfig } from '../recoil/config'

const player = {};
let pressedKeys = [];

export class AirshipGame extends Phaser.Scene {

  constructor() {
    super({ key: 'AirshipGame' });
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    } 
    this.database = firebase.database();
    // this.roomNumber = Math.random().toString().split('.')[1];
    this.playerId = Math.random().toString().split('.')[1];
    this.playerName = "";
    // this.roomAddress = "";
    this.previousX = 0;
    this.previousY = 0;
    this.updatePlayerPositions.bind(this.updatePlayerPositions);
    this.allPlayers = {};
  }

  preload() {
    this.load.image('ship', shipImg);
    this.load.spritesheet('player', playerSprite, {
      frameWidth: PLAYER_SPRITE_WIDTH,
      frameHeight: PLAYER_SPRITE_HEIGHT,
    });
    console.log(this.database);
    if (this.game.config.user) {
      this.playerId = this.game.config.user.userId;
      this.playerName = this.game.config.user.displayName;
    }
  }

  create() {
    const ship = this.add.image(0, 0, 'ship');
    player.sprite = this.add.container(AIRSHIP_PLAYER_START_X, AIRSHIP_PLAYER_START_Y)
    var sprite = this.add.sprite(0, 0, 'player');
    sprite.displayHeight = PLAYER_HEIGHT;
    sprite.displayWidth = PLAYER_WIDTH;
    var txtName = this.add.text(0, 0, this.playerName);
    txtName.font = "Arial";
    txtName.setOrigin(0.5, 2.3);
    player.sprite.add(sprite);
    player.sprite.add(txtName);
    // console.log(player.sprite)


    this.anims.create({
      key: 'running',
      frames: this.anims.generateFrameNumbers('player'),
      frameRate: 24,
      reapeat: -1,
    });

    this.input.keyboard.on('keydown', (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on('keyup', (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    // this.roomAddress = 'rooms/' + this.roomNumber + '/players/';

    var thisPlayerRef = firebase.database().ref('players/' + this.playerId);
    thisPlayerRef.onDisconnect().set({});
    var playersRef = firebase.database().ref('players/');
    playersRef.on('value', (snapshot) => {
      this.updatePlayerPositions(snapshot.val());
    });
  }

  updatePlayerPositions(data) {
    Object.keys(this.allPlayers).forEach(characterKey => {
      if (!data[characterKey]) {
        this.allPlayers[characterKey].sprite.destroy();
      }
    })

    Object.keys(data).forEach(characterKey => {
      if (this.allPlayers[characterKey] && characterKey != this.playerId) {
        const incomingData = data[characterKey];
        const existingCharacter = this.allPlayers[characterKey];
        
        if (incomingData.moving) {
          existingCharacter.sprite.list[0].play('running', true);
          existingCharacter.sprite.x = incomingData.x;
          existingCharacter.sprite.y = incomingData.y;
          existingCharacter.sprite.list[0].flipX = incomingData.flipX;
        }
      } else if (!this.allPlayers[characterKey] && characterKey != this.playerId) {
        const newCharacterData = data[characterKey];
        var newCharacter = {};
        newCharacter.sprite = this.add.container(newCharacterData.x, newCharacterData.y)
        var sprite = this.add.sprite(0, 0, 'player');
        sprite.displayHeight = PLAYER_HEIGHT;
        sprite.displayWidth = PLAYER_WIDTH;
        var txtName = this.add.text(0, 0, newCharacterData.playerName);
        txtName.font = "Arial";
        txtName.setOrigin(0.5, 2.3);
        newCharacter.sprite.add(sprite);
        newCharacter.sprite.add(txtName);
        this.allPlayers[characterKey] = newCharacter;
      } else {
      }
    })
    
  }
  
  update() {
    this.scene.scene.cameras.main.centerOn(player.sprite.x, player.sprite.y);
    movePlayer(pressedKeys, player.sprite);
    miraAnimateMovement(pressedKeys, player.sprite.list[0]);

    if (Math.round(player.sprite.x) != this.previousX || Math.round(player.sprite.y) != this.previousY) {
      firebase.database().ref('players/' + this.playerId).set({
        playerId: this.playerId, 
        playerName: this.playerName,
        x: Math.round(player.sprite.x), 
        y: Math.round(player.sprite.y),
        flipX: player.sprite.list[0].flipX,
        moving: true
      });
    } else {
      firebase.database().ref('players/' + this.playerId).update({ moving: false})
    }

    this.previousX = Math.round(player.sprite.x);
    this.previousY = Math.round(player.sprite.y);
  }
}

export default AirshipGame;
