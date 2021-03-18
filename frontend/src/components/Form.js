import React, { useState, useEffect } from 'react'
import Questionare from './Questionare';
import axios from 'axios'


const Form = ({handleShowForm, isTopic, topic, subtopic}) => {

    const[formValues, setFormValues] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        isTopic ? 
        axios.post("/create/subtopic",{ ...formValues, topic })
                .then(data => {
                    console.log(data);
                })
        :
        axios.post("/create/question",{ ...formValues, subtopic })
                .then(data => {
                    console.log(data);
                });        
    }
  
      
    return (
      <div className="login-dialog">
        <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
          <div className="sb-task-header dashed" data-click onClick={handleShowForm}>
            <div className="game-header-title">
                { isTopic? (
                    <div>
                        <h2>Create New Subtopics</h2>
                        <h4>{topic}</h4>
                    </div>

                ):(
                    <div>
                         <h2>Create New Questions</h2>
                        <h4>{subtopic}</h4>
                    </div>
                )}
              
            </div>
          </div>
                { isTopic? (
                    <Input label="subtopic" type="subtopic" formValues={formValues} setFormValues={setFormValues} />
                    ):
                <div>
                    <Input label="question" type="question" formValues={formValues} setFormValues={setFormValues} />
                    <Input label="correct answer" type="correct answer" formValues={formValues} setFormValues={setFormValues} />
                    <Input label="incorrect answer1" type="incorrect answer1" formValues={formValues} setFormValues={setFormValues} />
                    <Input label="incorrect answer2" type="incorrect answer2" formValues={formValues} setFormValues={setFormValues} />
                    <Input label="incorrect answer3" type="incorrect answer3" formValues={formValues} setFormValues={setFormValues} />
                    <Input label="difficulty" type="difficulty" formValues={formValues} setFormValues={setFormValues} />
                </div>
                }

                <input className="glow-border" form="form" type="submit" value="Submit" />
                <form id="form" onSubmit={handleSubmit}></form>          
        
        </div>
      </div>
    )
  
  }

export default Form;


const Input = ({label, type, formValues, setFormValues}) => {
  
    const handleChange = e => setFormValues({...formValues, [`${label}`]: e.target.value} )
  
    return (
        <div>
            <h4>{label}</h4>
             <input value={formValues[`${label}`]} className="glow-border" type={type} form="form" onChange={handleChange} required/>

        </div>       
    
    )
}