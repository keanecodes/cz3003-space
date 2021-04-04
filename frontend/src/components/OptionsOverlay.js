import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userAuth, sendUserServerUpdate } from '../recoil/users'
import { spriteIdMap, sceneIdMap } from "../utils/importer";
import styled from 'styled-components'



export default function OptionsOverlay({handleShowOpt}) {
  const [tab, setTab] = useState("color")

  return (
    <div className="sb-task-dialog-container">
      <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
        <OptionsHeader closeDialog={handleShowOpt}/>
        
        <CustomGameTab state={tab} changeTab={setTab} closeDialog={handleShowOpt}/>
        
        <ColourChoices state={tab} closeDialog={handleShowOpt}/>
        <MapSelectionsPurpose state={tab} closeDialog={handleShowOpt}/>
        <GoAnotherRoomField state={tab} closeDialog={handleShowOpt}/>
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

const ColourChoices = ({state, closeDialog}) => {
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
      { state == "color" ?
        (<div className="options-selection-container">
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
        </div>) : null
      }
    </>
  )
}

const CustomGameTab = ({state, changeTab}) => {

  const setSelected = e => {
    changeTab(e.target.dataset.tab);
  }
  
  return (
    <TabContainer>
      <Tab data-tab="color" onClick={setSelected} style={{opacity: state == "color" ? 1 : 0.5}} className={state == "color" ? "dashed" : null}>Customise Avatar</Tab>
      <TabLine className="glow-border"/>
      <Tab data-tab="world" onClick={setSelected} style={{opacity: state == "world" ? 1 : 0.5}} className={state == "world" ? "dashed" : null}>Explore Worlds</Tab>
      <TabLine className="glow-border"/>
      <Tab data-tab="custom" onClick={setSelected} style={{opacity: state == "custom" ? 1 : 0.5}} className={state == "custom" ? "dashed" : null}>Challenge Friends</Tab>
    </TabContainer>
  )
}

const CheckBox = ({map, topic}) => {

  const labelStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  }

  return (
    <label style={labelStyle} className="dashed">
      <span>{topic}: {map}</span>
      <input type="checkbox" style={{float: "right", cursor: "pointer"}}/>
    </label> 
  )
}

const GoAnotherRoomField = ({state, closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const [formValues, setFormValues] = useState(Math.random().toString().split('.')[1].slice(0,10))
  
  const handleOnChange = e => setFormValues(e.target.value)
  const handleSubmit = e => {
    e.preventDefault()
    setAuth({...auth, roomNum: e.target.localName == 'button' ? 'LOBBY' : formValues})
    closeDialog()
  }

  return (
    state == "custom"? (
      <form id="room-form" onSubmit={handleSubmit}>
        <div className="sb-task-foot" style={{marginTop: "1rem"}}>
          {auth?.roomNum !== 'LOBBY' 
            ? <button onClick={handleSubmit} className="glow-border" style={{width: "25%", paddingBottom: "0.7ex"}}>&#8592; Lobby</button> 
            : <span style={{flex:1, margin: "auto 0"}}>Challenge Room No.</span>
          }
          <input type="text" value={formValues} placeholder="Room number has to be 1-10 digits" onChange={handleOnChange} pattern="^\s*-?\d{1,10}" tabIndex="1" spellCheck="false" className="glow-border" style={{flex:2}}/>
          <input value="Start Challenge!" type="submit" form="room-form" tabIndex="2" className="glow-border" style={{cursor: "pointer"}}/>
        </div>
      </form>
    ) : null 
  )
}

const MapSelectionsPurpose = ({state, closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const handleGameMapUpdate = e => {
    setAuth({...auth, world: e.target.innerText})
    closeDialog()
  }

  return (
    <>
      { state == "world" ? 
        <><p style={{textAlign: "center"}}>Revisit cleared World Map (SDLC Topic Revisit)</p> 
        <div className="options-selection-container">
          { Object.keys(sceneIdMap).map( (name, i) =>
              <button 
                key={`map-scene-btn-${i}`}
                className="glow-border"
                onClick={state != "custom" ? handleGameMapUpdate : null}>
                {name}
              </button>
                
            )
          }
        </div></> : null
      }
      { state == "custom" ? 
        <><p style={{textAlign: "center"}}>Design Challenge Levels to be in 1 or More SDLC Topic(s) </p>
        <CheckBox map="The Skeld" topic="Requirements Engineering"/>
        <CheckBox map="Mira HQ" topic="Architectural Design"/>
        <CheckBox map="Polus" topic="Implementation"/>
        <CheckBox map="Airship" topic="Software Testing"/>
        <CheckBox map="Island" topic="Deployment"/></> : null
      }
    </>
  )
}

const TabContainer = styled.div`
  display: flex;
  margin: 2rem 1rem auto;
`;

const Tab = styled.div`
  flex: 1;
  text-align: center;
  height: 3rem;
  margin: 0 2rem;
  cursor: pointer;
`

const TabLine = styled.div`
  width: 0.1rem;
  height: 2.8rem;
  background-color: white;
`