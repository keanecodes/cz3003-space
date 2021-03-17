import React, { useState, useEffect } from 'react';
import Questions from './Questions';
import axios from 'axios'

//Test API for Trivia Questions
const API_URL = 'https://opentdb.com/api.php?amount=10&category=31&difficulty=easy&type=multiple';

export default function GameWorldStation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showQuestions, setOptionsOverlay]  = useState(false)
  const [topics, setTopics] = useState([])
  const [subtopics, setSubtopics] = useState([])

  const [topic, setTopic] = useState('')
  const [subtopic, setSubtopic] = useState('')
  const [difficulty, setDifficulty] = useState('')

  const [progress, setProgress] = useState(0)
  const handleShowQuestions = () => setOptionsOverlay(!showQuestions)

  useEffect( async () => {
      const results = await getTopics();
      console.log(results[0]);
      getSubtopics(results[currentIndex]);
    
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

  console.log(topics);

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

  const handleDifficulty = (topic, subtopic, level) => {
    setTopic(topic);
    setSubtopic(subtopic);
    setDifficulty(level);
    handleShowQuestions();
  }

  const handleNextChapter = () => {
    const newIndex = currentIndex + 1;

    console.log(progress+" "+subtopics.length)

    if(progress >= subtopics.length) {
      setProgress(0);
      setCurrentIndex(newIndex);
    }

    if(newIndex >= topics.length) {
      setCurrentIndex(newIndex-1);
        //setGameEnded(true);
    }
  }


  return (
    // <div>
    // <sb-content role="main" id="challenges">
    <div className="sb-categoryList">
      <div className="sb-category sb-table" data-id="The Deck" data-sb="true" data-type="sb-category" data-unsorted="true">
          <h2><sb-var data-var="id">{topics[currentIndex]}</sb-var></h2>
          <div data-id="misc-magic" data-sb="true" data-type="sb-task" data-solved="true" data-name="Requirement Analysis" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border"
            onClick={() => handleDifficulty(topics[currentIndex], subtopics[0], 'easy')} >
            <sb-task-details role="button">
              <h4><sb-var data-var="name">{subtopics[0]}</sb-var></h4>
              <sb-meta>
                <sb-var data-var="label">easy</sb-var>
              </sb-meta>
            </sb-task-details>
            <sb-task-stats>
              <h3><sb-var data-var="points">50</sb-var>pt</h3>
              
            </sb-task-stats>
          </div>
          <div data-id="misc-magic" data-sb="true" data-type="sb-task" data-name="Requirement Analysis" data-description="file -P name=1000 -m flag.mgc the_flag.txt" data-label="easy" data-click="setTaskActive/true" data-submit="submitFlag" className="sb-task glow-border" 
            onClick={() => handleDifficulty(topics[currentIndex], subtopics[1], 'medium')} >
            <sb-task-details role="button">
              <h4><sb-var data-var="name">{subtopics[1]}</sb-var></h4>
              <sb-meta>
                <sb-var data-var="label">medium</sb-var>
              </sb-meta>
            </sb-task-details>
            <sb-task-stats>
              <h3><sb-var data-var="points">100</sb-var>pt</h3>
            </sb-task-stats>
          </div>
          <div style={{opacity: 0.5}} data-id="misc-magic" data-sb="true" data-type="sb-task" className="sb-task glow-border" data-unsorted="true" data-active="false"
           onClick={() => handleDifficulty(topics[currentIndex], subtopics[2], 'hard')} >
            <sb-task-details role="button">
              <h4><sb-var data-var="name">{subtopics[2]}</sb-var></h4>
              <sb-meta>
                <sb-var data-var="label">hard</sb-var>
              </sb-meta>
            </sb-task-details>
            <sb-task-stats>
              <h3><sb-var data-var="points">150</sb-var>pt</h3>
            </sb-task-stats>
          </div>
          <div disabled style={{textAlign: "center", boxShadow: "0 0 var(--glow-border-blur) var(--glow-border-width) grey, inset 0 0 var(--glow-border-blur) var(--glow-border-width) grey", border: "var(--glow-border-width) solid grey", color: "grey", backgroundColor: "grey", opacity: 0.5}} data-id="misc-magic" data-sb="true" data-type="sb-task" className="sb-task glow-border" data-unsorted="true" data-active="false"
          onClick={handleNextChapter}>
            <sb-task-details role="button" style={{alignItems: "center"}}>
              <h4><sb-var data-var="name">Next Chapter</sb-var></h4>
            </sb-task-details>
          </div>
          <div>
          { showQuestions ? <Questions handleShowQuestions={handleShowQuestions} topic={topic} subtopic={subtopic} level={difficulty} progress={progress} setProgress={setProgress}/> : null } 
          </div>
      </div>
    </div>
      // </sb-content>
    // </div>
  )
}



