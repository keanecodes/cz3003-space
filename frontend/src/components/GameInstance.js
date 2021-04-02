import React, { useEffect, useState } from "react";
import Phaser from "phaser";
import MyGame from "../phaser/scene";
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'
import  MiraGame  from "../phaser/miraScene";
import  PolusGame  from "../phaser/polusScene";
import  AirshipGame  from "../phaser/airshipScene";
import  IslandGame  from "../phaser/islandScene";

export default function GameInstance({setGame, game }) {
  const auth = useRecoilValue(userAuth)
  const [instanceRoom, setInstanceRoom] = useState("00000000")
  useEffect(() => {
    if (game == null && auth.isAuthenticated) {
      const user = {
        ...auth?.user?.bio,
        roomNum: auth?.roomNum
      }
      if (user.roomNum == auth?.roomNum) {
        var instance = new Phaser.Game({
          
          type: Phaser.AUTO,
          parent: "phaser",
          width: 800,
          height: 600,
          scene: [MyGame],
          physics: {
            default: "arcade",
            gravity: { y: 0 },
          },
          callbacks: {
            postBoot: function (game) {
              setGame(game);
              setInstanceRoom(user?.roomNum)
            },
          },
        });
      }
      instance.config.user = user;
    } else if (game && instanceRoom != auth?.roomNum) {
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
