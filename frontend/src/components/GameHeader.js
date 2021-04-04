import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'
import OptionsOverlay from './OptionsOverlay'
import styled from 'styled-components'
import { RiShareLine } from 'react-icons/ri'
import twitterlogopath from '../assets/twitter.png'
import facebooklogopath from '../assets/facebook.png'

export default function GameHeader({render, setRender}) {
  const [showOptions, setOptionsOverlay]  = useState(false)
  const [showSocial, setShowSocial] = useState(false)
  const handleShowOpt = () => setOptionsOverlay(!showOptions)
  const [user, setUser] = useState([]);
  const auth = useRecoilValue(userAuth)


  useEffect(() => {
    
    axios.get("/user/get/score")
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
    <GameHeaderContainer>
      <ShareButton onClick={() => setShowSocial(!showSocial)}>Share</ShareButton>
      <SocialButton show={showSocial} type="twitter">
        {/* <a href="https://twitter.com/intent/tweet/?text=Super%20fast%20and%20easy%20Social%20Media%20Sharing%20Buttons.%20No%20JavaScript.%20No%20tracking.&amp" target="_blank"> */}
          <img src={twitterlogopath} alt="" width="100" height="100"/>
        {/* </a> */}
      </SocialButton>
      <SocialButton show={showSocial} type="facebook">
        {/* <a href="https://facebook.com/sharer/sharer.php?" target="_blank"> */}
          <img src={facebooklogopath} alt="" width="100" height="100"/>
        {/* </a> */}
      </SocialButton>
      <div className="game-header">
        <div className="game-header-title">
          <h2><sb-var data-var="name">Score: {user?.score}</sb-var></h2>
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
    </GameHeaderContainer>
  )
}

const GameHeaderContainer = styled.div` 
  width: 860px;
  margin: 0 auto;
  display: flex;
  position: relative;
`
const ShareButton = styled.button`
  height: 4rem;
  width: 8.5rem;
  background: transparent;
  font-family: var(--fonts-secondary);
  font-size: var(--heading-4-text-size);
  text-transform: uppercase;
  border: 2px solid var(--task-heading-text-color);
  color: var(--task-heading-text-color);
  border-radius: 10%;
  margin: 0.5rem 0;
  cursor: pointer;
  outline: none;
`

const SocialButton = styled.button`
  display: ${props => props.show ? "block" : "none"};
  // background-image: url('${props => props.path}');
  // background-repeat:no-repeat;
  background-color: transparent;
  position:absolute;
  left: ${props => props.type == "twitter" ? '-7rem' : '-12rem'};
  top: -0.8rem;
  border: none;
  outline: none;
  width: 50px;
  height: 50px;
  cursor: pointer;
`


