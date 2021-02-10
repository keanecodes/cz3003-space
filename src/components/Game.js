import React from 'react'
import Phaser from 'phaser'
import MyGame from '../phaser/scene'


export default function Game({setGame, mounted, handleMounted}) {
  
  const config = {
    type: Phaser.AUTO,
    parent: "phaser",
    width: 800,
    height: 600,
    scene: MyGame
  };

  if (mounted == false) {
    // game = new Phaser.Game(config);
    setGame(new Phaser.Game(config))
    handleMounted(true)
  }
  

  return (
    <div id="phaser"/> 
  )
}



