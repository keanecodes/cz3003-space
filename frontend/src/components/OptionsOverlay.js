import React, { useState } from 'react'
import { useRecoilState, useRecoilValue, useRecoilCallback } from 'recoil'
import { userAuth, sendUserServerUpdate } from '../recoil/users'
import { worldsState } from '../recoil/atoms'
import { spriteIdMap, sceneIdMap } from "../utils/importer";
import styled from 'styled-components'
import SocialButton from './SocialButton';



export default function OptionsOverlay({handleShowOpt}) {
  const [tab, setTab] = useState("color")

  return (
    <div className="sb-task-dialog-container">
      <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
        <OptionsHeader closeDialog={handleShowOpt}/>
        
        <OptionsTabs state={tab} changeTab={setTab} closeDialog={handleShowOpt}/>
        
        <ColourChoices state={tab} closeDialog={handleShowOpt}/>
        <Worlds state={tab} closeDialog={handleShowOpt}/>
        <CustomGame state={tab} closeDialog={handleShowOpt}/>
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

const Worlds = ({state, closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const worlds = useRecoilValue(worldsState)
  const handleGameMapUpdate = e => {
    setAuth({...auth, world: e.target.dataset.world})
    closeDialog()
  }

  return (
    <>
      { state == "world" ? 
        <><p style={{textAlign: "center"}}>Revisit cleared World Map (SDLC Topic Revisit)</p> 
        <div className="options-selection-container">
          { auth?.worlds.map( (name, i) =>
              <button 
                key={`map-scene-btn-${i}`}
                className="glow-border"
                style={{flex:1}}
                data-world={name}
                onClick={state != "custom" ? handleGameMapUpdate : null}>
                {`${name}`} <br/><br/> {`${worlds[name].topic}`}
              </button>
                
            )
          }
        </div></> : null
      }
    </>
  )
}

const CustomGame = ({state, closeDialog}) => {
  const [auth, setAuth] = useRecoilState(userAuth)
  const [roomNum, setRoomNum] = useState(auth?.roomNum == "LOBBY" ? Math.random().toString().split('.')[1].slice(0,8) : auth?.roomNum)
  const [worlds, setWorlds] = useRecoilState(worldsState)
  

  const handleOnChange = async e => {
    if (e.target.type == "text") {
      setRoomNum(e.target.value)
    } else if (e.target.type == "checkbox") {
      const prevWorlds = {...worlds, [e.target.dataset.map]:{selected: e.target.checked}}
      const newLen = Object.keys(prevWorlds).filter(s => prevWorlds[s].selected == true).length;
      if (newLen >= 1) {
        setWorlds({
          ...worlds, 
          [e.target.dataset.map]:{
            ...worlds[e.target.dataset.map],
            selected: e.target.checked
          }
        })
      }
    }
  }
  const handleSubmit = e => {
    e.preventDefault()
    const selected = Object.keys(worlds).filter(s => worlds[s].selected == true);
    const topics = selected.map(s => worlds[s].topic);
    if (selected.length >= 1) {
      setAuth({
        ...auth, 
        roomNum: e.target.localName == 'button' ? 'LOBBY' : roomNum,
        world: e.target.localName == 'button' ? 'The Skeld': selected[0],
        worlds: e.target.localName == 'button' ? Object.keys(sceneIdMap) : selected, 
        topics: e.target.localName == 'button' ? Object.values(worlds).map(w => w.topic) : topics, 
      })
    } else console.error("Error: This should not happen. Anyway, the problem is: Need to more than 1 world");
    // console.log(auth?.worlds)
    closeDialog()
  }

  return (
    <>
      
      { state == "custom" ? 
        <>
          { auth?.roomNum == "LOBBY" ?
            <>
              <p style={{textAlign: "center"}}>Design Challenge Levels to be of 1 or More SDLC Topic(s) </p>
              {Object.keys(worlds).map(w => 
                <CheckBox 
                  key={`select-world-${w}`}
                  checked={worlds[w].selected} 
                  setValue={handleOnChange} 
                  map={w} 
                  topic={worlds[w].topic}/>
              )}
            </> : null
          }
          
          <form id="room-form" onSubmit={handleSubmit}>
            <div className="sb-task-foot" style={{marginTop: "1rem"}}>
              {auth?.roomNum !== 'LOBBY' 
                ? <button onClick={handleSubmit} className="glow-border" style={{width: "25%", paddingBottom: "0.7ex"}}>&#8592; Lobby</button> 
                : <span style={{flex:1, margin: "auto 0"}}>Challenge Room No.</span>
              }
              <input type="text" value={roomNum} readOnly={auth?.roomNum !== "LOBBY"} placeholder="Room number has to be 1-8 digits" onChange={handleOnChange} pattern="^\s*-?\d{1,8}" tabIndex="1" spellCheck="false" className="glow-border" style={{flex:2}}/>
              {auth?.roomNum == 'LOBBY' 
                ? <input value="Start Challenge!" type="submit" form="room-form" tabIndex="2" className="glow-border"/>
                : <div style={{position: 'relative', marginTop: "-2rem"}}>&nbsp;&nbsp; Invite Friends 
                  <SocialButton show={true} social="twitter" style={{left:"revert", right: "0rem", top: "0.1rem"}} room={roomNum !== "LOBBY" ? roomNum : null}/>
                  <SocialButton show={true} social="telegram" style={{left:"revert", right: "5.2rem", top: "0.4rem"}} room={roomNum !== "LOBBY" ? roomNum : null}/>
                </div>
              }
            </div>
          </form>
        </> : null
      }
    </>
  )
}

const CheckBox = ({map, topic, setValue, checked}) => {

  const labelStyle = {
    paddingTop: "1rem",
    paddingBottom: "1rem",
  }

  return (
    <label style={labelStyle} className="dashed">
      <span>{topic}: {map}</span>
      <input checked={checked} onChange={setValue} data-map={map} data-topic={topic} type="checkbox" style={{float: "right", cursor: "pointer"}}/>
    </label> 
  )
}

const OptionsTabs = ({state, changeTab}) => {

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