import React from 'react'
import Phaser from 'phaser'
import MyGame from '../phaser/scene'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'

export default function Game({setGame, game}) {
  const auth = useRecoilValue(userAuth)
  
  if (game == null) {
    var instance = new Phaser.Game({
      type: Phaser.AUTO,
      parent: "phaser",
      width: 800,
      height: 600,
      scene: MyGame,
      callbacks: {
        postBoot: function(game) {
          setGame(game)
        }
      }
    })
    if (auth.isAuthenticated) instance.config.user = auth.user.bio;
  }
  
  if (module.hot) {
    module.hot.accept(() => {});
  
    module.hot.dispose(() => {
      window.location.reload();
    });
  }

  return (
    <div id="phaser"/> 
  )
}



