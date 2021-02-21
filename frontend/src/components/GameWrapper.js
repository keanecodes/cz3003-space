import React, { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'
import GameHeader from './GameHeader'
import GameInstance from './GameInstance'
import GamePrompt from './GamePrompt'
import GameWorldStation from './GameWorldStation'

export default function GameWrapper() {
  const auth = useRecoilValue(userAuth)
  const [game, setGame] = useState(null)
	const attachGame = game => setGame(game);

  return (
    <>
      <GameHeader auth={auth}/>
      <div className="task-wrapper">
        <GameWorldStation/>
        <div id="phaser">
          <GameInstance setGame={attachGame} game={game} auth={auth}/>
        </div>
        <GamePrompt auth={auth}/>
      </div>
    </>
  )
}