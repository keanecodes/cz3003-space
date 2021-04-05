import React, { useState } from 'react'
import GameHeader from '../components/GameHeader'
import GameInstance from '../components/GameInstance'
import GamePrompt from '../components/GamePrompt'
import GameWorldStation from '../components/GameWorldStation'

import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'

export default function GameWrapper() {
  const [game, setGame] = useState(null)
	const attachGame = game => setGame(game);
  const [render, setRender] = useState(false)

  const auth = useRecoilValue(userAuth)
  const isAuthProf = auth?.isAuthenticated && auth?.user.bio.isProfessor

  return (
    <>
      <GameHeader render={render} setRender={setRender}/>
      <div className="task-wrapper">
        {!isAuthProf ? <GameWorldStation setRender={setRender}/> : <div style={{flex:1}}/>}
        <div id="phaser">
          <GameInstance setGame={attachGame} game={game}/>
        </div>
        {!isAuthProf ? <GamePrompt/> : <div style={{flex:1}}/>}
      </div>
    </>
  )
}