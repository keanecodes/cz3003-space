import React from 'react'

export default function Toolbar({menuClick}) {
  return (
    <div className="toolbar">
      <a href="#login" data-click="logout,toggleMenu" className="sb-login-link" data-tolink="login" onClick={menuClick}></a>
      <a href="#teams">Teams</a>
      <a href="#scoreboard">Scoreboard</a>
      <div className="logo" role="button" title="logo" tabIndex="0" data-click="showLocation/teams,toggleMenu" data-tolink="login" onClick={menuClick}/>
      <a href="#readme" data-tolink="game" onClick={menuClick}>Play</a>
      <a href="#challenges">Questions</a>
      <a href="#beginners" data-click="clearReadme,toggleMenu" className="sb-readme-link">Challenges</a>
    </div>
  )
}
