import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import MyGame from "../phaser/scene";
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'

export default function GameInstance({setGame, game }) {
  const auth = useRecoilValue(userAuth)
  const [instanceRoom, setInstanceRoom] = useState("00000000")
  const [instanceWorld, setInstanceWorld] = useState("The Skeld")
  useEffect(() => {
    if (game == null && auth.isAuthenticated) {
      const user = {
        ...auth?.user?.bio,
        roomNum: auth?.roomNum,
        world: auth?.world
      }
      if (user.roomNum == auth?.roomNum) {
        var instance = new Phaser.Game({
          
          type: Phaser.AUTO,
          parent: "phaser",
          width: 800,
          height: 600,
          scene: MyGame,
          physics: {
            default: "arcade",
            gravity: { y: 0 },
          },
          callbacks: {
            postBoot: function (game) {
              setGame(game);
              setInstanceRoom(user?.roomNum)
              setInstanceWorld(user?.world)
            },
          },
        });
      }
      instance.config.user = user;
    } else if (game && (instanceRoom != auth?.roomNum || instanceWorld != auth?.world)) {
      game.destroy(true)
      setGame(null)
    }
  }, [auth, game]);

  if (module.hot) {
    module.hot.accept(() => {});

    module.hot.dispose(() => {
      window.location.reload();
    });
  }

  return <></>;
}
