import React, { useEffect } from "react";
import Phaser from "phaser";
import MyGame from "../phaser/scene";
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'

export default function GameInstance({ setGame, game }) {
  const auth = useRecoilValue(userAuth)

  useEffect(() => {
    if (game == null) {
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
          },
        },
      });
      if (auth.isAuthenticated) instance.config.user = auth.user.bio;
    }
  }, [auth]);

  if (module.hot) {
    module.hot.accept(() => {});

    module.hot.dispose(() => {
      window.location.reload();
    });
  }

  return <></>;
}
