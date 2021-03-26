import React, { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'
import GameHeader from '../components/GameHeader'
import GameInstance from '../components/GameInstance'
import GamePrompt from '../components/GamePrompt'
import GameWorldStation from '../components/GameWorldStation'

export default function GameWrapper() {
  const auth = useRecoilValue(userAuth)
  const [game, setGame] = useState(null)
	const attachGame = game => setGame(game);
  const [render, setRender] = useState(false)

  return (
    <>
      <GameHeader auth={auth} render={render} setRender={setRender}/>
      <div className="task-wrapper">
        <GameWorldStation auth={auth} setRender={setRender}/>
        <div id="phaser">
          <GameInstance setGame={attachGame} game={game}/>
        </div>
        <GamePrompt/>
      </div>
    </>
  )
}