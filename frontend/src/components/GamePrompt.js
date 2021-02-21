import React from 'react'

export default function GamePrompt({auth}) {
  const isAuthUser = auth?.isAuthenticated
  const isAuthProf = isAuthUser && auth?.user.bio.isProfessor

  return (
    <div className="task-prompt">
      <sb-update data-id="Beginning" data-sb="true" data-type="sb-update" tabindex="10000" style={{ order: 0 }} data-unsorted="true">
        <h3 className="dashed-h3 dashed">Welcome to Space Maze!</h3>
        {isAuthProf 
        ? <p role="article">Spectate as your students learn more on Software Lifecycle Phases as they progress through stations and maps! </p>
        : <p role="article">Learn more on Software Lifecycle Phases as you progress through stations and maps! </p>}
      </sb-update>
      <sb-update data-id="potato" data-sb="true" data-type="sb-update"  data-click="togglePotato" tabindex="10100" style={{ order: 100 }} data-unsorted="true">
        <h3 className="sb-dashed">Get started!</h3>
        {isAuthProf 
         ? <p role="article">&#8592; Select a chapter on the left or start pressing the arrow keys on your keyboard to view another part of the map to see your student engagement in realtime.</p>
         : <p role="article">&#8592; Find the Use Case chapter's first task on the left to get hints on your first station for this map's topic on Requirements Engineering.</p>
        }
      </sb-update>
    </div>
  )
}
