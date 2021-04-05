import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'
import Questions from './Questions';
import Hints from './Hints';
import { getCollision,getCollision1,getCollision2 } from "../phaser/scene";

//Test API for Trivia Questions
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple';

export default function GameWorldStation({ setRender }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestions, setOptionsOverlay]  = useState(false)
  const [topics, setTopics] = useState([])
  const [subtopics, setSubtopics] = useState([])
  const [showHints, setHintsOverlay]  = useState(false)
  let showQsn = false;

  const [topic, setTopic] = useState('')
  const [subtopic, setSubtopic] = useState('')
  const [difficulty, setDifficulty] = useState([])

  const [tries, setTries] = useState(0);
  const [points, setPoints] = useState(0)
  const [progress, setProgress] = useState([])
  const auth = useRecoilValue(userAuth)
  const handleShowQuestions = () => setOptionsOverlay(!showQuestions)
  const handleShowHints = () => setHintsOverlay(!showHints)


  useEffect( async () => {
      const top = await getTopics();
      // console.log(top[0]); //kne: please try to remove testing console logs where possible 

      const subs = await getSubtopics(top[currentIndex]);
      // console.log(subs) //kne: please try to remove testing console logs where possible

      getSubtopicsDifficulty(top[currentIndex], subs);
    
  }, [currentIndex]);



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

  const getSubtopicsDifficulty = async (topic, subtopics) => {
    // console.log(subtopics) //kne: please try to remove testing console logs where possible
    const res = await axios.get("/subtopics/level", { params: {topic, subtopics} })
          .then(data => {
              console.log(data.data)
              setDifficulty(data.data);
          });

    return res;
  }



  // Extract relevant data
  const cleanUp = (data) => {
    let items = []
    const channel = data.data

    channel.forEach(element => {
      let item = element[1];
        
        items.push(item);  
      })
    return items;
  }

  

  const handleQuestions = (topic, subtopic) => {
    setTopic(topic);
    setSubtopic(subtopic);

    // setDifficulty(level);
    if (getCollision()==true && subtopics[0]==subtopic){
      showQsn=true;
      console.log("1"+ getCollision());
      handleShowQuestions();
    }
    else if (getCollision1()==true && subtopics[1]==subtopic){
      showQsn=true;
      console.log("2" + getCollision1());
      handleShowQuestions();
    }
    else if (getCollision2()==true && subtopics[2]==subtopic){
      showQsn=true;
      console.log("3" + getCollision2());
      handleShowQuestions();
    }
    else{
      showQsn=false;
      handleHints(topic, subtopic);
    }
  }

  const handleHints = (topic, subtopic) => {
    setTopic(topic);
    setSubtopic(subtopic);
    console.log("handling hints");
    handleShowHints();
  }

  const handlePoints = (level) => {
    switch(level){
      case "easy": 
        // setPoints(50);
        return 50;

      case "medium": 
        // setPoints(100);
        return 100;

      case "hard": 
        // setPoints(150);
        return 150;

      default: 
        return 0;
    }
  }

  const handleNextChapter = () => {
    const newIndex = currentIndex + 1;

    console.log(progress+" "+subtopics.length)

    if(newIndex >= topics.length) {
      return;
      setCurrentIndex(newIndex-1);
        //setGameEnded(true);
    }

    if(progress.length >= subtopics.length) {
      setProgress([]);
      setCurrentIndex(newIndex);
    }

    
  }

  const returnDifficulty = (stopic) => {
    return difficulty.find((e) => {
      return e.subtopic === stopic
         })?.difficulty
  }


  return (
    // <div>
    // <sb-content role="main" id="challenges">
    <div className="sb-categoryList">
      <div className="sb-category sb-table" data-id="The Deck" data-sb="true" data-type="sb-category" data-unsorted="true">
          <h2><sb-var data-var="id">{topics[currentIndex]}</sb-var></h2>
          {
           subtopics.length > 0 ?  
            subtopics.map((stopic, index) => (
              progress.find((e) => e === stopic ) ? 
              (
                <div key={`${topics[currentIndex]}-${subtopic}-${index}`} data-id="misc-magic" data-sb="true" data-type="sb-task" data-solved="true" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border">
                  <sb-task-details role="button">
                    <h4><sb-var data-var="name">{stopic}</sb-var></h4>
                    <sb-meta>
                      <sb-var data-var="label">{returnDifficulty(stopic)}</sb-var>
                    </sb-meta>
                  </sb-task-details>
                  <sb-task-stats>
                    <h3>Completed</h3>
                  </sb-task-stats>
                </div>
              ): 
              (
                <div data-id="misc-magic" data-sb="true" data-type="sb-task" data-name="Requirement Analysis" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border" 
                  onClick={() => handleQuestions(topics[currentIndex], stopic)} >
                  <sb-task-details role="button">
                    <h4><sb-var data-var="name">{stopic}</sb-var></h4>
                    <sb-meta>
                    <sb-var data-var="label">{returnDifficulty(stopic)}</sb-var>
                    </sb-meta>
                  </sb-task-details>
                  <sb-task-stats>
                    <h3><sb-var data-var="points">{handlePoints(returnDifficulty(stopic))}</sb-var>pt</h3>
                  </sb-task-stats>
                </div>
              )
            )
          ) : <h1>Loading...</h1>
          }
         
          <div disabled style={{textAlign: "center", boxShadow: "0 0 var(--glow-border-blur) var(--glow-border-width) grey, inset 0 0 var(--glow-border-blur) var(--glow-border-width) grey", border: "var(--glow-border-width) solid grey", color: (progress.length >= subtopics.length)? "green":"grey", backgroundColor: (progress.length >= subtopics.length)? "green":"grey", opacity: (progress.length >= subtopics.length)? 1:0.5}} data-id="misc-magic" data-sb="true" data-type="sb-task" className="sb-task glow-border" data-unsorted="true" data-active="false"
          onClick={handleNextChapter}>
            <sb-task-details role="button" style={{alignItems: "center"}}>
              <h4><sb-var data-var="name">Next Chapter</sb-var></h4>
            </sb-task-details>
          </div>
          <div v-if="showQsn">
          { showQuestions ? <Questions  tries={tries} 
                                        setTries={setTries} 
                                        handlePoints={handlePoints} 
                                        setRender={setRender} 
                                        auth={auth} 
                                        handleShowQuestions={handleShowQuestions} 
                                        topic={topic} 
                                        subtopic={subtopic} 
                                        progress={progress} 
                                        setProgress={setProgress}
                                        returnDifficulty={returnDifficulty}/> : null } 
          </div>
          <div v-else>
          { showHints ? <Hints  setRender={setRender} 
                                auth={auth} 
                                handleShowHints={handleShowHints} 
                                topic={topic} 
                                subtopic={subtopic} /> : null } 
          </div>
          
      </div>
    </div>
      // </sb-content>
    // </div>
  )
}



