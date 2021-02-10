import React from 'react'

export default function Account() {
  return (
    <div className="content account-page" id="login">
      <div className="login-dialog glow-border" role="dialog" data-submit="joinTeam">
        <h3 className="dashed">Sign In</h3>
        <label>
          <h4>Username</h4>
          <input className="glow-border" type="text" form="login-form" pattern="^[a-zA-Z0-9_-]{20}$" spellCheck="false"/>
          <span>If you don't have a team key, you can create a new team.</span>
        </label>
        <label>
          <h4>Password</h4>
          <input className="glow-border" type="password" form="login-form" pattern="^[a-zA-Z0-9_-]{20}$" spellCheck="false"/>
        </label>
        {/* <label className="sb-email-consent" data-click="logEmail">
          <input type="checkbox"/>
          <span>
            By joining this team, you agree to follow the <a href="/rules.pdf" target="_blank">
            rules of the Google CTF 2018</a>. Note you can only join one team.
          </span>
        </label> */}
        <input className="glow-border" form="login-form" type="submit" value="Sign in"/>
        <form id="login-form"></form>
        <div>
          {/* or <a href="#login" data-click="recoverTeam">[Recover Old Team]</a> */}
          username: user@mail.com password: password
        </div>
      </div>
    </div>
  )
}
