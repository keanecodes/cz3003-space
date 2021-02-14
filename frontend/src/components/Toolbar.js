import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { contentState } from "../recoil/atoms"
import { userAuth, logoutUser } from '../recoil/users'

export default function Toolbar({menuClick, history}) {

  const [auth, setAuth] = useRecoilState(userAuth)
  const setPageContent = useSetRecoilState(contentState)
  // const setNotification = useSetRecoilState(commonNotification)

  // onLogout
  const onLogout = () => {
    setAuth({
      isAuthenticated: false,
      user: null
    })

    // setNotification({
    //   message: 'Logged out successfully.',
    //   isVisible: true
    // })

    logoutUser()
    // history.push(routes.user.login)
    history.push('/')
    location.reload()
  }

  return (
    <div className="toolbar">
      <Link to={auth?.isAuthenticated ? "/game" : "/login"} data-tolink={auth?.isAuthenticated ? "game" : "login"} onClick={menuClick}>Game</Link> 
      <a href="#teams">Leaderboard</a>
      <div className="logo" role="button" title="logo" tabIndex="0" data-click="showLocation/teams,toggleMenu" >
        <Link to={auth?.isAuthenticated ? "/game" : "/login"} onClick={auth?.isAuthenticated ? null : menuClick} data-tolink="login" style={{width: "100%", height: "100%", display: "block", border: "none"}} />
      </div>
      <a href="#challenges">Options</a>
      <Link to="/login" className="sb-login-link" data-tolink="login" data-team-name={auth?.isAuthenticated ? auth.user.bio.displayName : null} onClick={auth.isAuthenticated ? onLogout : menuClick}/> 
    </div>
  )
}
