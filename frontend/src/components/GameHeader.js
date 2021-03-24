import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function GameHeader({auth, render, setRender}) {
  const [showOptions, setOptionsOverlay]  = useState(false)
  const handleShowOpt = () => setOptionsOverlay(!showOptions)
  const [user, setUser] = useState([]);


  useEffect(() => {
    
    axios.get("/user/score")
            .then(data => {
              setUser(cleanUp(data));
            });  
    setRender(false);
          
  }, [render]);


  const cleanUp = (data) => {
    let items = []
    const channel = data.data

    channel.forEach(element => {
      let item = {
            username: element.displayName.stringValue,
            score: element.score.integerValue
        }
        items.push(item);  
      })
    
    let user = items.find((e) => {
      return e.username === auth.user.bio.displayName
    });


    return user;
  }
    
  return (
    // <div className="sb-task-dialog-container">
    //   <div className="sb-task-dialog">
    <>
    <div className="game-header">
      <div className="game-header-title">
        <h2><sb-var data-var="name">Score: {user.score}</sb-var></h2>
      </div>
      <div className="game-header-title">
        <h2><sb-var data-var="name">Room: 12091923094</sb-var></h2>
        <div className="sb-meta">
          <sb-var data-var="label">The Skeld - Requirements Engineering</sb-var>
        </div>
      </div>
      <button onClick={handleShowOpt}>Options</button>
    </div>
    { showOptions ? <OptionsOverlay handleShowOpt={handleShowOpt}/> : null } 
    </>
    // </div>
    // </div>
  )
}

const OptionsOverlay = ({handleShowOpt}) => {
  const [customGame, setCustomGame] = useState(false)
  const handleSetCustomGame = () => setCustomGame(!customGame)
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
          <button className="glow-border">Red</button>
          <button className="glow-border">Blue</button>
          <button className="glow-border">Black</button>
          <button className="glow-border">Yellow</button>
          <button className="glow-border">Green</button>
        </div>
        
        <div style={{display: "flex", justifyContent: "spaceBetween", margin: "0 auto", marginTop: "3rem"}}>
          <p style={{opacity: customGame ? 0.5 : 1}}>Go to other Room or World</p>
          <CheckBox handleSetCustomGame={handleSetCustomGame}/>
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
          <button className="glow-border">Mira HQ)</button>
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