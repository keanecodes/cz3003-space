import React, { useState, useEffect } from 'react'
import Questionare from './Questionare';
import axios from 'axios'


const Stats = ({topic, subtopic, users, showSummary}) => {

    const [progress, setProgress] = useState([]);
    const [score, setScore] = useState([]);

   
    useEffect(() => {
        axios.get("/user/get/progress",{ params: { topic, subtopic } })
            .then(data => {
                console.log(cleanUpTries(data))
                setProgress(cleanUpTries(data))
            }); 

        axios.get("/user/get/topic/score",{ params: { topic } })
        .then(data => {
            console.log(cleanUpScore(data))
            setScore(cleanUpScore(data))
            // setProgress(cleanUp(data))
        }); 
      
    }, [topic, subtopic, showSummary]);


    const cleanUpTries = (data) => {
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

    const cleanUpScore = (data) => {
        let items = []
        const channel = data.data
        
        channel.forEach(element => {
          let item = {
                username: getUsername(element.userId),
                score: element.score
            }
            items.push(item);  
          })
        return items;
    }


    const getUsername = (id) => {
        return users.find((user) => user.id === id)?.username
    }
  
      
    return (
      <div className="content">
        <div className="sb-table-head" aria-modal="true" role="dialog" style={{justifyContent:"center", flex: 1, flexDirection:"row"}}>
          <div className="sb-task-header dashed" data-click>
            <div className="game-header-title">
              <h2>{topic}</h2>
              {
                  (showSummary) ? 
                  <span><h1>overview</h1></span> :
                  <span><h1>{subtopic} stats</h1></span> 

              }

            </div>
          </div>
            
            <div className="sb-table sb-teamlist" data-sort-by="rank" data-unsorted="false">
            {   (showSummary) ? 
            (
                (score.length>0) ?
                score.map((user) => (
                    <div data-id="PPP" data-sb="true" data-type="sb-team" data-task-summary="17 tasks" data-tasks="crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747499507" data-score="3350" data-rank="1" data-top100="true" data-top10="true" style={{"--rank":1}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="1">
                    <span><sb-var data-var="rank">{user.username}</sb-var></span>
                    <span><sb-var data-var="taskSummary">{user.score} pts</sb-var></span>
                    </div>
                )) :
                <h5>No user progress found</h5>
            ): 
            (
                (progress.length>0) ?
                progress.map((user) => (
                        <div data-id="PPP" data-sb="true" data-type="sb-team" data-task-summary="17 tasks" data-tasks="crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747499507" data-score="3350" data-rank="1" data-top100="true" data-top10="true" style={{"--rank":1}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="1">
                        <span><sb-var data-var="rank">{user.username}</sb-var></span>
                        <span><sb-var data-var="taskSummary">{user.tries} tries</sb-var></span>
                        </div>
                )) :
                <h5>No user progress found</h5>
            )
                
            }
            </div>

          </div>
        
        </div>
    )
  
  }

  export default Stats;