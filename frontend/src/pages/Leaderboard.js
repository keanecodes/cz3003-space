import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Stats from './Stats'


export default function Leaderboard() {

  const [users, setUsers] = useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [subtopic, setSubtopic] = useState("");

  const [index, setIndex] = useState(0);
  const [showStats, setOptionsOverlay]  = useState(false);
  const [showSummary, setShowSummary]  = useState(false);

  const handleShowStats = () => setOptionsOverlay(!showStats);



  useEffect( async () => {

    axios.get("/user/get/score")
            .then(data => {
              setUsers(cleanUpScore(data));
              console.log(cleanUpScore(data))
            });   

    const top = await getTopics();
    console.log(top[0]);

    const subs = await getSubtopics(top[index]);
    console.log(subs)
  
}, [index]);



const getTopics = async () => {
  const res = await axios.get("/topics")
          .then(data => {
              setTopics(cleanUp(data));
              return cleanUp(data);
          });

  return res;
}

const getSubtopics = async (topic) => {
  const res = await axios.get("/subtopics", { params: topic })
        .then(data => {
            setSubtopics(data.data);
            return data.data;
        });

  return res;
}


  const cleanUpScore = (data) => {
    let items = []
    const channel = data.data

    channel.forEach(element => {
      let item = {
            id: element.userId.stringValue,
            username: element.displayName.stringValue,
            score: element.score.integerValue
        }
        items.push(item);  
      })
    
    items.sort((a, b) => b.score - a.score);

    return items;
  }

  const cleanUp = (data) => {
    let items = []
    const channel = data.data

    channel.forEach(element => {
      let item = element[1];
        
        items.push(item);  
      })
    return items;
  }

  const handleTopic = (e) => {
    e.preventDefault();

    setIndex(index+1);
    if(index >= 2) {
      setIndex(0)
    }

  }

  const handleSubtopic = (sub) => {
    setShowSummary(false);
    setSubtopic(sub);
    handleShowStats();
    
  }

  const handleSummary = (sub) => {
    setShowSummary(true);
    handleShowStats();
    
  }

  return (
    // <div>
    // <div className="game-header">

      <div className="content" role="main" id="teams">
        <div className="sb-table sb-teamlist" data-sort-by="rank" data-unsorted="false">
          <div className="sb-table-head" justify-content="center">
              <h2 onClick={handleTopic} className="glow-border"><sb-var data-var="id">{topics[index]}</sb-var></h2>
              {
              subtopics.map((sub) => (
                <h5 onClick={() => handleSubtopic(sub)} className="glow-border"><sb-var data-var="id">{sub}</sb-var></h5>
              ))
              }
              <h2 onClick={handleSummary} className="glow-border"><sb-var data-var="id">Summary</sb-var></h2>            

          </div>
          <div className="sb-table-head">

            <h2>Players</h2>
            <div className="dashed sb-spacer"/>
              
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
              <div key={`${element.username}-${index}`} data-id="PPP" data-sb="true" data-type="sb-team" data-task-summary="17 tasks" data-tasks="crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" title="Solved tasks: crypto-auth,keys-whisperwhileyouwork,misc-distributed,misc-luckyheart,misc-magic,misc-polyglot,misc-secure-safe-1,misc-secure-safe-2,re-drm,re-elisp,re-flagvm,re-journey,re-yawn,web-blind-xss,web-js-safe-3,web-pwn-gdb-as-a-service,web-quinify" data-last="1540747499507" data-score="3350" data-rank="1" data-top100="true" data-top10="true" style={{"--rank":1}} className="sb-team sb-table-row" data-unsorted="true" data-oldrank="1">
              <span><sb-var data-var="rank">{index+1}</sb-var></span>
              <span><sb-var data-var="taskSummary">17 tasks</sb-var></span>
              <span><sb-var data-var="id">{element.username}</sb-var></span>
              <span><sb-var data-var="score">{element.score}</sb-var></span>
            </div>
            )) : <h1> Loading... </h1>
          }
        </div>
        <div> 
            {showStats? <Stats handleShowStats={handleShowStats} topic={topics[index]} subtopic={subtopic} users={users} showSummary={showSummary}/> : null }
        </div>
      </div>
    // </div>
  )
}
