import React, { useState, useEffect } from 'react';
import axios from 'axios';


let topics = [];

const Form = ({handleShowForm, isTopic, topic, subtopic}) => {

  const[formValues, setFormValues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({...formValues, topic})
    isTopic ?
        axios.post("/create/subtopic",{ ...formValues, topic })
            .then(data => {
              console.log(data);
            })
        :
        axios.post("/create/question",{ ...formValues, topic, subtopic })
            .then(data => {
              console.log(data);
            });

    setFormValues([]);
    location.reload();
  }

  return (
      <div className="login-dialog">
        <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
          <div className="sb-task-header dashed" data-click onClick={handleShowForm}>
            <div className="game-header-title">
              { isTopic? (
                  <div>
                    <h2>Create New Subtopic</h2>
                    <h4>{topic}</h4>
                  </div>

              ):(
                  <div>
                    <h2>Create New Question</h2>
                    <h4>{subtopic}</h4>
                  </div>
              )}

            </div>
          </div>
          { isTopic &&
          (
              <Input label="subtopic" type="subtopic" formValues={formValues} setFormValues={setFormValues} />
          )}
          <div>
            <Input label="question" type="question" formValues={formValues} setFormValues={setFormValues} />
            <Input label="correct_answer" type="correct_answer" formValues={formValues} setFormValues={setFormValues} />
            <Input label="incorrect_answer1" type="incorrect_answer1" formValues={formValues} setFormValues={setFormValues} />
            <Input label="incorrect_answer2" type="incorrect_answer2" formValues={formValues} setFormValues={setFormValues} />
            <Input label="incorrect_answer3" type="incorrect_answer3" formValues={formValues} setFormValues={setFormValues} />
            <Input label="difficulty" type="difficulty" formValues={formValues} setFormValues={setFormValues} />
          </div>

          <input className="glow-border" form="form" type="submit" value="Submit" />
          <form id="form" onSubmit={handleSubmit}></form>

        </div>
      </div>
  )

}

const EditForm = ({handleShowEditForm,  topic, subtopic}) => {
  console.log(topic, subtopic)
  const[formValues, setFormValues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({...formValues, topic, subtopic})

    axios.post("/edit/question",{ ...formValues, topic , subtopic})
        .then(data => {
          console.log(data);
        })

    setFormValues([]);
    // location.reload();
  }

  return (
      <div className="login-dialog">
        <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
          <div className="sb-task-header dashed" data-click onClick={handleShowEditForm}>
            <div className="game-header-title">
              <p>Edit Question</p>
            </div>
          </div>

          <div>
            <Input label="question" type="question" formValues={formValues} setFormValues={setFormValues} />
            <Input label="newQuestion" type="newQuestion" formValues={formValues} setFormValues={setFormValues} />
            <Input label="correct_answer" type="correct_answer" formValues={formValues} setFormValues={setFormValues} />
            <Input label="incorrect_answer1" type="incorrect_answer1" formValues={formValues} setFormValues={setFormValues} />
            <Input label="incorrect_answer2" type="incorrect_answer2" formValues={formValues} setFormValues={setFormValues} />
            <Input label="incorrect_answer3" type="incorrect_answer3" formValues={formValues} setFormValues={setFormValues} />
            <Input label="difficulty" type="difficulty" formValues={formValues} setFormValues={setFormValues} />
          </div>

          <input className="glow-border" form="form" type="submit" value="Submit" />
          <form id="form" onSubmit={handleSubmit}></form>

        </div>
      </div>
  )
}

const Input = ({label, type, formValues, setFormValues}) => {
  const handleChange = e => setFormValues({...formValues, [`${label}`]: e.target.value} )

  return (
      <div>
        <h4>{label}</h4>
        <input value={formValues[`${label}`]} className="glow-border" type={type} form="form" onChange={handleChange} required/>

      </div>

  )
}

export default function Topics() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showForm, setOverlay]  = useState(false)
  const [topicState, setTopicState] = useState('')
  const [subtopicState, setSubtopicState] = useState('')
  const [isTopic, setIsTopic] = useState(false);
  const handleShowForm = () => setOverlay(!showForm)
  const [reload, setReload] = useState(false)

  const [showEditForm, setShowEditForm] = useState(false);
  const [modifyQuestions, setModifyQuestions] = useState(false);

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
          console.log(questions)
          subtopicAndQuestions.push({subtopic: subtopic, questions: questions});
        }

        const exists = topics.find(e => e.topic === topic);

        if (exists === undefined) {
          topics.push({topic: topic, subtopics: subtopicAndQuestions});
        }
        console.log(topics)
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

  // const handleTopic = (topic) => {
  //   setTopicState(topic);
  //   setIsTopic(true);
  //   handleShowForm()
  //   }

  const handleSubtopic = (topic, subtopic) => {
    setTopicState(topic);
    setSubtopicState(subtopic);
    setIsTopic(false);
    setModifyQuestions(true);
  }

  return (
      <div className="content" role="main" id="challenges">

        <sb-categorylist>
          {topics.map((e, index) => (
              <div className="sb-category" data-id="keys" data-sb="true" data-type="sb-category" data-unsorted="true">
                <h2><sb-var data-var="id">{e.topic}</sb-var></h2>

                {e.subtopics.map((subtopicObj) => (
                    <div  className="sb-task glow-border"
                          onClick = {() => handleSubtopic(e.topic, subtopicObj.subtopic)}>

                      <sb-task-details role="button">
                        <h4><sb-var data-var="name">{subtopicObj.subtopic}</sb-var></h4>
                      </sb-task-details>

                      {subtopicObj.questions.map(question => {
                        if (question.question){
                          return (
                              <p>
                                {question.question.stringValue.toString()}
                                <br/>
                              </p>
                          )
                        }

                        return (
                            <p>
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
        {
          modifyQuestions ?

        <div>
          <div className="sb-task glow-border" onClick={()=>{
            setShowEditForm(!showEditForm);
            setOverlay(false);
          }}>
            <sb-task-details role="button" >
              <h4><sb-var data-var="name">Edit question</sb-var></h4>
            </sb-task-details>
          </div>

          <br/>
          <br/>
          <br/>

          <div className="sb-task glow-border" onClick={()=>{
            handleShowForm();
            setShowEditForm(false);
          }}>
            <sb-task-details role="button">
              <h4><sb-var data-var="name">Create New Question</sb-var></h4>
            </sb-task-details>
          </div>
          <br/>
          <br/>
        </div> : null}
          { showForm ? <Form handleShowForm={handleShowForm} isTopic={isTopic} topic={topicState} subtopic={subtopicState} setReload={setReload} /> : null }
          { showEditForm ? <EditForm handleShowEditForm={()=>setShowEditForm(!showEditForm)} isTopic={isTopic} topic={topicState} subtopic={subtopicState} setReload={setReload} /> : null }
        </div>
      </div>
  )
}

