import React, { useState, useEffect } from 'react'
import Questionare from './Questionare';
import axios from 'axios'


const Questions = ({handleShowQuestions, topic, subtopic, level, progress, setProgress}) => {

    // const dispatch = useDispatch();
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameEnded, setGameEnded] = useState(false);

    // const ids = useSelector((state) => (state.form)); 
  
    console.log(level, topic, subtopic);
    
    useEffect(() => {
        // fetch(API_URL)
        //     .then(res => res.json())
        //      .then(data => {
        //          setQuestions(data.results);
        //         // console.log(data);
        //      });
        axios.get("/questions",{ params: { topic, subtopic, level } })
                .then(data => {
                    // console.log(cleanUp(data));
                    setQuestions(cleanUp(data));
                });        
    }, []);

    useEffect (() => {
      if(gameEnded === true)
      { 
        if(score === questions.length) {
          console.log(subtopic);
          setProgress(progress.concat(subtopic));
          console.log(progress);
        }
      }
    }, [gameEnded])
  
    // const questions = data.questions;
  
    const handleAnswer = (answer) => {
        const newIndex = currentIndex + 1;
  
        setCurrentIndex(newIndex);
        if(answer === questions[currentIndex].correct_answer) {
            setScore(score+1);
        }
  
        if(newIndex >= questions.length) {
            setGameEnded(true);
        }
    }
  
    // Extract relevant data
    const cleanUp = (data) => {
      let items = []
      const channel = data.data
  
      channel.forEach(element => {
        let item = {
              correct_answer: element.correct_answer.stringValue,
              incorrect_answers: [
                element.incorrect_answers.arrayValue.values[0].stringValue, 
                element.incorrect_answers.arrayValue.values[1].stringValue, 
                element.incorrect_answers.arrayValue.values[2].stringValue
              ],
              question: element.question.stringValue
          }
          items.push(item);  
        })
      return items;
    }
  
      
    return (
      <div className="sb-task-dialog-container">
        <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
          <div className="sb-task-header dashed" data-click onClick={handleShowQuestions}>
            <div className="game-header-title">
              <h2>{subtopic}</h2>
              <div className="sb-meta">The Skeld - Room: 12091923094</div>
            </div>
          </div>
          {gameEnded ? (
            <div>
              <h1>You got {score}/{questions.length}</h1>
            </div>
          ): questions.length > 0 ? (
              <Questionare data={questions[currentIndex]} handleAnswer = {handleAnswer}/>
            ) : <div>
                <h1>Loading...</h1>
              </div>
          }
        
        </div>
      </div>
    )
  
  }

  export default Questions;