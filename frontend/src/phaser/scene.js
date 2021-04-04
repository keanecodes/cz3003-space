import Phaser from 'phaser';
import { spriteIdMap, sceneIdMap } from '../utils/importer'
import {
  PLAYER_SPRITE_HEIGHT,
  PLAYER_SPRITE_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
} from "./constants";
import { movePlayer } from "./movement";
import { animateMovement } from "./animation";

import firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore"
import { firebaseConfig } from "../recoil/config";

let pressedKeys = [];
const npc = {};

export class MyGame extends Phaser.Scene {
  constructor() {
    super({ key: "Game" });
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.RTdatabase = firebase.database();
    this.firestore = firebase.firestore();
    this.roomNumber = "00000000";
    this.world = "The Skeld";
    this.PLAYER_START_X = 330;
    this.PLAYER_START_Y = 100;
    this.player = {};
    this.playerId = Math.random().toString().split('.')[1];
    this.playerName = "";
    this.roomAddress = "";
    this.sprite = "pWHT";
    this.previousX = 0;
    this.previousY = 0;
    this.updatePlayerPositions.bind(this.updatePlayerPositions);
    this.isProfessor = false;
    this.allPlayers = {};
  }

  preload() {
    Object.keys(sceneIdMap).map(id => {
      this.load.image(id, sceneIdMap[id].img);
    })
    Object.keys(spriteIdMap).map(id => {
      this.load.spritesheet(id, spriteIdMap[id].sprite, {
        frameWidth: PLAYER_SPRITE_WIDTH,
        frameHeight: PLAYER_SPRITE_HEIGHT,
      });
    })

    if (this.game.config.user) {
      this.playerId = this.game.config.user.userId;
      this.playerName = this.game.config.user.displayName;
      this.playerSpriteColor = this.game.config.user.sprite;
      // console.log(this.playerSprite)
      this.isProfessor = this.game.config.user.isProfessor;//to check if user is the prof
      this.roomNumber = this.game.config.user.roomNum;
      if (this.game.config.user.world) {
        this.world = this.game.config.user.world;
        this.PLAYER_START_X = sceneIdMap[this.world].startX;
        this.PLAYER_START_Y = sceneIdMap[this.world].startY;
      }
    }
  }

  create() {
    const ship = this.add.image(0, 0, this.world);
    this.player.sprite = this.add.container(this.PLAYER_START_X, this.PLAYER_START_Y)
    var sprite = this.add.sprite(0, 0, this.playerSpriteColor);
    if(this.isProfessor){
      sprite.visible=false;
    }//make sprite invisible for prof
    sprite.displayHeight = PLAYER_HEIGHT;
    sprite.displayWidth = PLAYER_WIDTH;
    var txtName = this.add.text(0, 0, this.playerName);
    if(this.isProfessor){
      txtName.visible=false;
    }//make name invisible for prof
    txtName.font = "Arial";
    txtName.setOrigin(0.5, 2.3);
    this.player.sprite.add(sprite);
    this.player.sprite.add(txtName);

    npc.sprite = this.add.container(this.PLAYER_START_X-500, this.PLAYER_START_Y-50);
    var npcsprite1 = this.add.sprite(0, 0, "npc");
    npcsprite1.displayHeight = PLAYER_HEIGHT;
    npcsprite1.displayWidth = PLAYER_WIDTH;
    var npcName1 = this.add.text(0, 0, "Question Master");
    npcName1.font = "Arial";
    npcName1.setOrigin(0.5, 2.3);

    npc.sprite.add(npcsprite1);
    npc.sprite.add(npcName1);

    this.physics.world.enable(npcsprite1);
    this.physics.world.enable(sprite);

    npcsprite1.body.onWorldBounds = true;
    
    if(this.isProfessor==false){
    this.physics.add.collider(sprite, npcsprite1, function (npcsprite1) {
      console.log("Collided with npc");
      // insert pop up for qsn here
    });}//questions only for students

    Object.keys(spriteIdMap).map(id => {
      this.anims.create({
        key: `run${id}`,
        frames: this.anims.generateFrameNumbers(id),
        frameRate: 24,
        reapeat: -1,
      });
    })

    this.input.keyboard.on("keydown", (e) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on("keyup", (e) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    this.roomAddress = this.roomNumber == 'LOBBY' ? 'lobby/' + this.world + '/players/' : 'rooms/' + this.world + '/' + this.roomNumber + '/players/';//link for custom game

    const thisPlayerRTRef = this.RTdatabase.ref(this.roomAddress + this.playerId);
    thisPlayerRTRef.onDisconnect().set({});
    this.scene.scene.events.on('destroy', () => thisPlayerRTRef.set({}))
    const playersFirestoreRef = this.firestore.collection('users');
    playersFirestoreRef.doc(this.playerId).onSnapshot(doc => {
      if (doc.data().sprite !== this.playerSpriteColor) {
        const spriteColor = doc.data().sprite
        this.RTdatabase.ref(this.roomAddress + this.playerId).update({ updating: true, spriteColor})
        this.player.sprite.list[0].setTexture(spriteColor) 
      }
    })
    const gameplayFirestoreRef = this.firestore.collection('gameplays');
    gameplayFirestoreRef.doc(this.playerId).set({
      checkPoint: "", //Game Master
      checkPosX: this.PLAYER_START_X, //-170,
      checkPosY: this.PLAYER_START_Y, //50,
      world: this.world,
      room: this.roomNumber,
      worlds: this.roomNumber == "LOBBY" ? Object.keys(sceneIdMap) : this.game.config.user?.worlds,
      topics: this.roomNumber == "LOBBY" 
        ? ["Requirements Engineering", "Architectural Design", "Implementation", "Software Testing", "Deployment"] 
        : this.game.config.user?.topics,
    })
    const playersRef = this.RTdatabase.ref(this.roomAddress);
    playersRef.on('value', snapshot => { this.updatePlayerPositions(snapshot.val()) });
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
          existingCharacter.sprite.x = incomingData.x;
          existingCharacter.sprite.y = incomingData.y;
          existingCharacter.sprite.list[0].play(`run${incomingData.spriteColor}`, true);
          existingCharacter.sprite.list[0].flipX = incomingData.flipX;
        }

        if (incomingData.updating) existingCharacter.sprite.list[0].setTexture(incomingData.spriteColor) 

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
    this.scene.scene.cameras.main.centerOn(this.player.sprite.x, this.player.sprite.y);
    movePlayer(pressedKeys, this.player.sprite, this.world,this.isProfessor);
    animateMovement("run" + this.playerSpriteColor, pressedKeys, this.player.sprite.list[0]);

    if (Math.round(this.player.sprite.x) != this.previousX || Math.round(this.player.sprite.y) != this.previousY) {
      this.RTdatabase.ref(this.roomAddress + this.playerId).set({
        playerId: this.playerId, 
        playerName: this.playerName,
        spriteColor: this.playerSpriteColor,
        x: Math.round(this.player.sprite.x), 
        y: Math.round(this.player.sprite.y),
        flipX: this.player.sprite.list[0].flipX,
        moving: true,
        updating: false
      });
    } else {
      this.RTdatabase.ref(this.roomAddress + this.playerId).update({ moving: false})
      if (this.player.sprite.list[0].texture.key != this.playerSpriteColor) {
        this.playerSpriteColor = this.player.sprite.list[0].texture.key
      } else {
        this.RTdatabase.ref(this.roomAddress + this.playerId).update({ updating: false})
      }
    }

    this.previousX = Math.round(this.player.sprite.x);
    this.previousY = Math.round(this.player.sprite.y);
  }
}

export default MyGame;

