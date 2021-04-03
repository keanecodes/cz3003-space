import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAuth, sendUserServerUpdate } from '../recoil/users'
import { spriteIdMap, sceneIdMap } from "../utils/importer";



export default function OptionsOverlay({handleShowOpt}) {
  const [customGame, setCustomGame] = useState(false)

  return (
    <div className="sb-task-dialog-container">
      <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
        <OptionsHeader closeDialog={handleShowOpt}/>
        <ColourChoices closeDialog={handleShowOpt}/>
        
        <CustomGameToggle state={customGame} toggleState={setCustomGame} />
        
        <GoAnotherRoomField customGame={customGame} closeDialog={handleShowOpt}/>
        <MapSelectionsPurpose customGame={customGame} closeDialog={handleShowOpt}/>
      </div>
    </div>
  )
}

const OptionsHeader = ({closeDialog}) => {
  const auth = useRecoilValue(userAuth)
  return (
    <div className="sb-task-header dashed" data-click onClick={closeDialog}>
      <div className="game-header-title">
        <h2>Requirements Engineering</h2>
        <div className="sb-meta">{auth?.world ? auth.world : "The Skeld"} - Room: {auth?.roomNum}</div>
      </div>
      <h3>Options</h3>
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
      <p>Change Body Colour</p>
      <div className="options-selection-container">
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
      </div>
    </>
  )
}

const CustomGameToggle = ({state, toggleState}) => {
  const handleUIToggleCustomGame = () => toggleState(!state)
  
  return (
    <div style={{display: "flex", justifyContent: "spaceBetween", margin: "0 auto", marginTop: "3rem"}}>
      <p style={{opacity: state ? 0.5 : 1}}>Go to other Room or World</p>
      <CheckBox toggle={handleUIToggleCustomGame}/>
      <p style={{opacity: state ? 1 : 0.5}}>Create Custom Game</p>
    </div>
  )
}

const CheckBox = ({toggle}) => {
  return (
    <label className="sb-email-consent" style={{marginLeft: "10px", marginTop: "-10px"}} data-click="logEmail">
      <input type="checkbox" onClick={toggle}/>
      {/* <span>
        By joining this team, you agree to follow the <a href="/rules.pdf" target="_blank">
        rules of the Google CTF 2018</a>. Note you can only join one team.
      </span> */}
    </label> 
  )
}

const GoAnotherRoomField = ({customGame, closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const [formValues, setFormValues] = useState(Math.random().toString().split('.')[1].slice(0,10))
  
  const handleOnChange = e => setFormValues(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    setAuth({...auth, roomNum: e.target.localName == 'button' ? 'LOBBY' : formValues})
    closeDialog()
  }

  return (
    !customGame ? (
      <form id="room-form" onSubmit={handleSubmit}>
        <div className="sb-task-foot">
          {auth?.roomNum !== 'LOBBY' ? <button onClick={handleSubmit} className="glow-border" style={{width: "25%", paddingBottom: "0.7ex"}}>&#8592; Lobby</button> : null}
          <input type="text" value={formValues} placeholder="Room number has to be 1-10 digits" onChange={handleOnChange} pattern="^\s*-?\d{1,10}" tabIndex="1" spellCheck="false" className="glow-border"/>
          <span aria-live="assertive" role="alert"><strong><sb-var data-var="error"></sb-var></strong></span>
          <input value="Go" type="submit" form="room-form" tabIndex="2" className="glow-border"/>
        </div>
      </form>
    ) : null 
  )
}

const MapSelectionsPurpose = ({customGame, closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const handleGameMapUpdate = e => {
    setAuth({...auth, world: e.target.innerText})
    closeDialog()
  }

  return (
    <>
      { customGame 
        ? <p>Select 1 or multiple topic(s) for the custom game</p>
        : <p>Revisit cleared World Map (Topic Revisit)</p>
      }
      <div className="options-selection-container">
        { Object.keys(sceneIdMap).map( (name, i) =>
            <button 
              key={`map-scene-btn-${i}`}
              className="glow-border"
              onClick={customGame == false ? handleGameMapUpdate : null}>
              {name}
            </button>
          )
        }
      </div>
      { customGame 
        ?(<><br/>
          <div className="sb-task-foot" style={{padding: "0 var(--task-dialog-padding)"}}>
            <input style={{ width: "100%"}} type="submit" className="glow-border" value="Go to New Room for Custom Game"/>
          </div>
          </>)
        : null
      }
    </>
  )
}
