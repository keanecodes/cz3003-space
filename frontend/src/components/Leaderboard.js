import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Leaderboard() {

  const [users, setUsers] = useState([]);


  useEffect(() => {
    
    axios.get("/user/score")
            .then(data => {
              setUsers(cleanUp(data));
              console.log(cleanUp(data))
            });        
  }, []);


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
    
    items.sort((a, b) => a.score > b.score ? -1 : 1);

    return items;
  }




  return (
    // <div>
      <div className="content" role="main" id="teams">
        <div className="sb-table sb-teamlist" data-sort-by="rank" data-unsorted="false">
          <div className="sb-table-head">
            <h2>Players</h2>
            <div className="dashed sb-spacer">

              {/* <sb-task-details role="button">
                  <h2><sb-var data-var="name">Spaceship</sb-var></h2>
                  <h4>Topic</h4>
                </sb-task-details> */}
              {/* <div className="sb-task-dialog-container">
                <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
                  <div className="sb-task-header dashed" data-click onClick={handleShowOpt}>
                    <h3>Topics</h3>
                    <h3>Subtopics</h3>
                  </div>
                  
                </div>
              </div> */}
            </div>
            <h3>Ranking</h3>
          </div>
          <div className="sb-table-head">
            <h4>Place</h4>
            <h4># Tasks</h4>
            <h4 className="sb-spacer">Name</h4>
            <h4>Score</h4>
          </div>
          {
            (users.length > 0) ? users.map((element, index) => (
              <div data-id="PPP" data-sb="true" data-type="sb-team" data-task-summary="17 tasks" data-tasks="crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747499507" data-score="3350" data-rank="1" data-top100="true" data-top10="true" style={{"--rank":1}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="1">
              <span><sb-var data-var="rank">{index+1}</sb-var></span>
              <span><sb-var data-var="taskSummary">17 tasks</sb-var></span>
              <span><sb-var data-var="id">{element.username}</sb-var></span>
              <span><sb-var data-var="score">{element.score}</sb-var></span>
            </div>
            )) : <h1> Loading... </h1>
          }
          
          
        </div>
      </div>
    // </div>
  )
}
