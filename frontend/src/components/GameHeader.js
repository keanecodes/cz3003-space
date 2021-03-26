import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OptionsOverlay from './OptionsOverlay'

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


