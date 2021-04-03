import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../components/Form';
import { useRecoilValue } from 'recoil'
import { userAuth } from '../recoil/users'

let topics = [];

export default function Topics() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setOverlay]  = useState(false)
  const [topicState, setTopicState] = useState('')
  const [subtopicState, setSubtopicState] = useState('')
  const [isTopic, setIsTopic] = useState(false);
  const handleShowForm = () => setOverlay(!showForm)
  const [reload, setReload] = useState(false)
  const auth = useRecoilValue(userAuth)
  const isAuthUser = auth?.isAuthenticated
  const isAuthProf = isAuthUser && auth?.user.bio.isProfessor

  useEffect( () => {
    (async () => {
      setReload(false);
      const results = await getTopics();

      if (currentIndex < results.length){
        let topic = results[currentIndex];
        const subtopics = await getSubtopics(topic);

        let subtopicAndQuestions = []
        for (let subtopic of subtopics){
          let questions = (await getQuestions(topic, subtopic))
          // console.log(questions) //kne: please try to remove testing console logs where possible
          subtopicAndQuestions.push({subtopic: subtopic, questions: questions});
        }

        const exists = topics.find(e => e.topic === topic);

        if (exists === undefined) {
          topics.push({topic: topic, subtopics: subtopicAndQuestions});
        }
        // console.log(topics) //kne: please try to remove testing console logs where possible
        setCurrentIndex(currentIndex+1);
      }
    })();


  }, [currentIndex, reload]);

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

  const getQuestions = async (topic, subtopic) => {
    const res = await axios.get('/questions', {params: {topic: topic, subtopic: subtopic}})
        .then(data => data.data)

    return res;
  };

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
    setTopicState(topic);
    setIsTopic(true);
    if(isAuthProf==true){handleShowForm();}//check if prof

  }

  const handleSubtopic = (topic, subtopic) => {
    setTopicState(topic);
    setSubtopicState(subtopic);
    setIsTopic(false);
    if(isAuthProf==true){handleShowForm();}//check if prof

  }


  return (
      <div className="content" role="main" id="challenges">
        <sb-categorylist>
          {topics.map((e, index) => (
              <div key={`${e.topic}-${index}`} className="sb-category" data-id="keys" data-sb="true" data-type="sb-category" data-unsorted="true">
                <h2 onClick = {() => handleTopic(e.topic)} ><sb-var data-var="id">{e.topic}</sb-var></h2>
                {e.subtopics.map((subtopicObj) => (
                    <div key={`${e.topic}-${index}-${subtopicObj.subtopic}`} className="sb-task glow-border"
                         onClick = {() => handleSubtopic(e.topic, subtopicObj.subtopic)}>

                      <sb-task-details role="button">
                        <h4><sb-var data-var="name">{subtopicObj.subtopic}</sb-var></h4>
                      </sb-task-details>

                      {subtopicObj.questions.map(question => {

                        return (
                            <p key={`${e.topic}-${index}-${subtopicObj.subtopic}-${question.question}`}>
                              {question.question}
                              <br/>
                            </p>
                        )
                      })}

                      <sb-task-stats>
                        <h3><sb-var data-var="points">50</sb-var>pt</h3>
                        <sb-meta>
                          <sb-var data-var="solves">9</sb-var> solves
                        </sb-meta>
                      </sb-task-stats>
                    </div>
                ))}
              </div>
          ))}
        </sb-categorylist>
        <div>
          { showForm ? <Form handleShowForm={handleShowForm} isTopic={isTopic} topic={topicState} subtopic={subtopicState} setReload={setReload} /> : null }
        </div>
      </div>
  )
}
