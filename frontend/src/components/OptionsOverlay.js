import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { userAuth, sendUserServerUpdate } from '../recoil/users'
import { spriteIdMap } from "../phaser/importer";


export default function OptionsOverlay({handleShowOpt}) {
  const [customGame, setCustomGame] = useState(false)
  const handleUIToggleCustomGame = () => setCustomGame(!customGame)

  return (
    <div className="sb-task-dialog-container">
      <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
        <div className="sb-task-header dashed" data-click onClick={handleShowOpt}>
          <div className="game-header-title">
            <h2>Requirements Engineering</h2>
            <div className="sb-meta">The Skeld - Room: 12091923094</div>
          </div>
          <h3>Options</h3>
        </div>
        <p>Change Body Colour</p>
        <div className="options-selection-container">
          <ColourChoices closeDialog={handleShowOpt}/>
        </div>
        
        <div style={{display: "flex", justifyContent: "spaceBetween", margin: "0 auto", marginTop: "3rem"}}>
          <p style={{opacity: customGame ? 0.5 : 1}}>Go to other Room or World</p>
          <CheckBox handleSetCustomGame={handleUIToggleCustomGame}/>
          <p style={{opacity: customGame ? 1 : 0.5}}>Create Custom Game</p>
        </div>
        { !customGame ? 
         (<form>
          <div className="sb-task-foot">
            <input aria-label="Flag" type="text" pattern="\{[^{}]+\}" tabIndex="1" placeholder="12091923094" spellCheck="false" className="glow-border"/>
            <span aria-live="assertive" role="alert"><strong><sb-var data-var="error"></sb-var></strong></span>
            <input type="submit" tabIndex="2" className="glow-border" value="Go"/>
          </div>
        </form>) 
        : null }

        { customGame 
          ? <p>Select 1 or multiple topic(s) for the custom game</p>
          : <p>Revisit cleared World Map (Topic Revisit)</p>
        }
        <div className="options-selection-container">
          <button className="glow-border">The Skeld</button>
          <button className="glow-border">Mira HQ</button>
          <button className="glow-border">Polus</button>
          <button className="glow-border">Airship</button>
          <button className="glow-border">Island</button>
        </div>
        
        { customGame ?
         (<><br/>
          <div className="sb-task-foot" style={{padding: "0 var(--task-dialog-padding)"}}>
            <input style={{ width: "100%"}} type="submit" className="glow-border" value="Go to New Room for Custom Game"/>
          </div>
          </>)
        : null}
      </div>
    </div>
  )
}

const ColourChoices = ({closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const [UILoading, setUILoading] = useState(false)
  
  const handleGameAvatarUpdate = async e => {
    const reqBody = {...auth.user.bio, sprite: e.target.dataset.playerColor}
    setUILoading(true)
    const { data } = await sendUserServerUpdate(reqBody)
    if (data) {
      setAuth({...auth, user: data})
      // console.log(auth)
      setUILoading(false)
      closeDialog()
    }
  }

  const slicedSpriteMap = Object.keys(spriteIdMap).slice(1)

  return(
    <>
      { UILoading 
        ? (<div style={{margin: "0 auto", fontSize: "2.5rem"}}>Painting your body... (☆v☆)</div>)
        : (slicedSpriteMap.map(id =>
          <button
            key={`{btn-color-${id}}`}
            data-player-color={id} 
            onClick={handleGameAvatarUpdate} 
            className="glow-border">
              {spriteIdMap[id].label.toUpperCase()}
          </button>
        ))
      }
    </>
  )
}

const CheckBox = ({handleSetCustomGame}) => {
  return (
    <label className="sb-email-consent" style={{marginLeft: "10px", marginTop: "-10px"}} data-click="logEmail">
      <input type="checkbox" onClick={handleSetCustomGame}/>
      {/* <span>
        By joining this team, you agree to follow the <a href="/rules.pdf" target="_blank">
        rules of the Google CTF 2018</a>. Note you can only join one team.
      </span> */}
    </label> 
  )
}
