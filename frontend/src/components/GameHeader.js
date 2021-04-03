import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'
import OptionsOverlay from './OptionsOverlay'

export default function GameHeader({render, setRender}) {
  const [showOptions, setOptionsOverlay]  = useState(false)
  const handleShowOpt = () => setOptionsOverlay(!showOptions)
  const [user, setUser] = useState([]);
  const auth = useRecoilValue(userAuth)


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
        <h2><sb-var data-var="name">Room: {auth?.roomNum}</sb-var></h2>
        <div className="sb-meta">
          <sb-var data-var="label">{auth?.world} - Requirements Engineering</sb-var>
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


