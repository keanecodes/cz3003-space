import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './Form';

let topics = [];

export default function Topics() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setOverlay]  = useState(false)
  const [topic, setTopic] = useState('')
  const [subtopic, setSubtopic] = useState('')
  const [isTopic, setIsTopic] = useState(false);
  const handleShowForm = () => setOverlay(!showForm)


  useEffect( async () => {

    const results = await getTopics();

    if (currentIndex < results.length){
      const result = results[currentIndex];
      const subtopics = await getSubtopics(result);

     
      const exists = topics.find(e => e.topic === result)
      
      console.log(exists);

      if (exists === undefined) {
        topics.push({topic: result, subtopics: subtopics});
      }

      setCurrentIndex(currentIndex+1);
    }
  }, [currentIndex]);

  const getTopics = async () => {
    const res = await axios.get("/topics")
            .then(data => {
                // setTopics(cleanUp(data));
                return cleanUp(data);
            });

    return res;
  }

  const getSubtopics = async (topic) => {
    const res = await axios.get("/subtopics", { params: topic })
          .then(data => {
              // setSubtopics(data.data);
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

  const handleTopic = (topic) => {

    setTopic(topic);
    setIsTopic(true);
    handleShowForm();

  }

  const handleSubtopic = (subtopic) => {

    setSubtopic(subtopic);
    setIsTopic(false);
    handleShowForm();

  }

  return (

      <div className="content" role="main" id="challenges">
        <sb-categorylist>
          {topics.map((e, index) => ( 
              <div className="sb-category sb-table" data-id="keys" data-sb="true" data-type="sb-category" data-unsorted="true">
              <h2 onClick = {() => handleTopic(e.topic)} ><sb-var data-var="id">{e.topic}</sb-var></h2>
              <div className="sb-task glow-border" data-id="crypto-auth" data-sb="true" data-type="sb-task" data-points="100" data-solves="9" data-teams="!SpamAndHex, 5BC, DEFKOR00T" data-solved="false" data-name="Large graph factorization"  data-label="crypto, math" data-link="" data-host="auth.ctfcompetition.com 1337" data-attachment="" data-click="setTaskActive/true" data-submit="submitFlag" data-unsorted="true" data-active="false"
                onClick = {() => handleSubtopic(e.subtopics[0])} >
                <sb-task-details role="button">
                  <h4><sb-var data-var="name">{e.subtopics[0]}</sb-var></h4>
                  <sb-meta>
                    <sb-var data-var="label">crypto, math</sb-var>
                  </sb-meta>
                </sb-task-details>
                <sb-task-stats>
                  <h3><sb-var data-var="points">50</sb-var>pt</h3>
                  <sb-meta>
                    <sb-var data-var="solves">9</sb-var> solves
                  </sb-meta>
                </sb-task-stats>
              </div>
              <div className="sb-task glow-border" data-id="crypto-auth" data-sb="true" data-type="sb-task" data-points="100" data-solves="9" data-teams="!SpamAndHex, 5BC, DEFKOR00T" data-solved="false" data-name="Large graph factorization"  data-label="crypto, math" data-link="" data-host="auth.ctfcompetition.com 1337" data-attachment="" data-click="setTaskActive/true" data-submit="submitFlag" data-unsorted="true" data-active="false"
               onClick = {() => handleSubtopic(e.subtopics[1])} >
                <sb-task-details role="button">
                  <h4><sb-var data-var="name">{e.subtopics[1]}</sb-var></h4>
                  <sb-meta>
                    <sb-var data-var="label">crypto, math</sb-var>
                  </sb-meta>
                </sb-task-details>
                <sb-task-stats>
                  <h3><sb-var data-var="points">100</sb-var>pt</h3>
                  <sb-meta>
                    <sb-var data-var="solves">9</sb-var> solves
                  </sb-meta>
                </sb-task-stats>
              </div>
              <div className="sb-task glow-border" data-id="crypto-auth" data-sb="true" data-type="sb-task" data-points="100" data-solves="9" data-teams="!SpamAndHex, 5BC, DEFKOR00T" data-solved="false" data-name="Large graph factorization"  data-label="crypto, math" data-link="" data-host="auth.ctfcompetition.com 1337" data-attachment="" data-click="setTaskActive/true" data-submit="submitFlag" data-unsorted="true" data-active="false"
               onClick = {() => handleSubtopic(e.subtopics[2])}>
                <sb-task-details role="button">
                  <h4><sb-var data-var="name">{e.subtopics[2]}</sb-var></h4>
                  <sb-meta>
                    <sb-var data-var="label">crypto, math</sb-var>
                  </sb-meta>
                </sb-task-details>
                <sb-task-stats>
                  <h3><sb-var data-var="points">150</sb-var>pt</h3>
                  <sb-meta>
                    <sb-var data-var="solves">9</sb-var> solves
                  </sb-meta>
                </sb-task-stats>
              </div>
            </div>
          ))}
        </sb-categorylist>
        <div>
          { showForm ? <Form handleShowForm={handleShowForm} isTopic={isTopic} topic={topic} subtopic={subtopic} /> : null } 
          </div>
      </div>
  )
}
