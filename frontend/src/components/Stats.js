import React, { useState, useEffect } from 'react'
import Questionare from './Questionare';
import axios from 'axios'


const Stats = ({handleShowStats, topic, subtopic, users}) => {

    const [progress, setProgress] = useState([])
   
    useEffect(() => {
        axios.get("/user/progress",{ params: { topic, subtopic } })
            .then(data => {
                console.log(cleanUp(data))
                setProgress(cleanUp(data))
            }); 
      
    }, []);


    const cleanUp = (data) => {
        let items = []
        const channel = data.data
    
        channel.forEach(element => {
          let item = {
                username: getUsername(element.userId),
                tries: element.tries
            }
            items.push(item);  
          })
        return items;
      }

    const getUsername = (id) => {
        return users.find((user) => user.id === id)?.username
    }
  
      
    return (
      <div className="sb-task-dialog-container">
        <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
          <div className="sb-task-header dashed" data-click onClick={handleShowStats}>
            <div className="game-header-title">
              <h2>{topic}</h2>
              <div className="sb-meta">{subtopic} stats</div>
            </div>
          </div>
          <div>
            <div className="sb-table-head">
              {/* <h4>Rank</h4> */}
              <h4>Number of Tries</h4>
              <div className="dashed sb-spacer"/>

            </div>
            <div className="sb-table sb-teamlist" data-sort-by="rank" data-unsorted="false">
            {
                (progress.length>0) ?
                progress.map((user) => (
                        <div data-id="PPP" data-sb="true" data-type="sb-team" data-task-summary="17 tasks" data-tasks="crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747499507" data-score="3350" data-rank="1" data-top100="true" data-top10="true" style={{"--rank":1}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="1">
                        <span><sb-var data-var="rank">{user.username}</sb-var></span>
                        <span><sb-var data-var="taskSummary">{user.tries} tries</sb-var></span>
                        </div>
                )) :
                <h1>No user progress found</h1>
            }
            </div>

          </div>
        
        </div>
      </div>
    )
  
  }

  export default Stats;