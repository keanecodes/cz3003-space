import React, {useEffect, useState} from 'react'
import {getAllQuestionsInTopic, getAllQuestionsFromAllTopics} from "../recoil/topics";
import Topic from "./Topic";


export default function Topics() {

  const [topics, setTopics] = useState([
    {
      "name": "Code Management"
    },
    {
      "name": "Optimisation",
      "What does P complexity mean?": {
        "Answer": "NP complexity means that an algorithm will take probabilistic time to complete.",
        "Options": [
          "NP complex",
          " value2",
          " foo"
        ]
      },
      "What does NP complexity mean?": {
        "Answer": "NP complexity means that an algorithm will take non-probabilistic time to complete.",
        "Options": [
          "P complex",
          "time",
          "space"
        ]
      }
    },
    {
      "name": "Project Management",
      "What is Project Management?": {
        "Options": [
          "wrong12",
          "wrong323",
          "wrong44"
        ],
        "Answer": "Project Management is the study of factors involved in overseeing a project from beginning to end."
      }
    },
    {
      "name": "Requirement Analysis",
      "Why is the sky blue?": {
        "Answer": "NP complexity means that an algorithm will take probabilistic time to complete. This is different from P complexity.",
        "Options": [
          "NP complex",
          " value2",
          " foo2"
        ]
      }
    },
    {
      "name": "Software Processes",
      "What is P complexity?": {
        "Answer": "Here is my answer",
        "Options": [
          "lorem",
          " isum",
          " oais"
        ]
      }
    },
    {
      "name": "System Architecture and Design"
    }
  ]);
  useEffect(()=>{
    // (async function(){
    //   let val = await getAllQuestionsFromAllTopics();
    //   setTopics(val.data);
    //   console.log('topics')
    //   console.log(topics)
    // })()
  },[]);

  console.log(topics)
  return (
      <div className='topics-display'>
        {topics.map(topic => {
          return <Topic topic={topic} key={topic.name}/>
          })
        }

      </div>

  )
}