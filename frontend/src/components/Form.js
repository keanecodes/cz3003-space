// import React, { useState, useEffect } from 'react'
// import Questionare from './Questionare';
// import axios from 'axios'
//
//
// const Form = ({handleShowForm, isTopic, topic, subtopic}) => {
//
//     const[formValues, setFormValues] = useState([]);
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//
//         console.log({...formValues, topic})
//         isTopic ?
//             axios.post("/create/subtopic",{ ...formValues, topic })
//                 .then(data => {
//                     console.log(data);
//                 })
//             :
//             axios.post("/create/question",{ ...formValues, topic, subtopic })
//                 .then(data => {
//                     console.log(data);
//                 });
//
//         setFormValues([]);
//         location.reload();
//     }
//
//     return (
//         <div className="login-dialog">
//             <div className="sb-task-dialog glow-border" aria-modal="true" role="dialog">
//                 <div className="sb-task-header dashed" data-click onClick={handleShowForm}>
//                     <div className="game-header-title">
//                         { isTopic? (
//                             <div>
//                                 <h2>Create New Subtopic</h2>
//                                 <h4>{topic}</h4>
//                             </div>
//
//                         ):(
//                             <div>
//                                 <h2>Create New Question</h2>
//                                 <h4>{subtopic}</h4>
//                             </div>
//                         )}
//
//                     </div>
//                 </div>
//                 { isTopic &&
//                 (
//                     <Input label="subtopic" type="subtopic" formValues={formValues} setFormValues={setFormValues} />
//                 )}
//                 <div>
//                     <Input label="question" type="question" formValues={formValues} setFormValues={setFormValues} />
//                     <Input label="correct_answer" type="correct_answer" formValues={formValues} setFormValues={setFormValues} />
//                     <Input label="incorrect_answer1" type="incorrect_answer1" formValues={formValues} setFormValues={setFormValues} />
//                     <Input label="incorrect_answer2" type="incorrect_answer2" formValues={formValues} setFormValues={setFormValues} />
//                     <Input label="incorrect_answer3" type="incorrect_answer3" formValues={formValues} setFormValues={setFormValues} />
//                     <Input label="difficulty" type="difficulty" formValues={formValues} setFormValues={setFormValues} />
//                 </div>
//
//                 <input className="glow-border" form="form" type="submit" value="Submit" />
//                 <form id="form" onSubmit={handleSubmit}></form>
//
//             </div>
//         </div>
//     )
//
// }
//
// export default Form;
//
//
// const Input = ({label, type, formValues, setFormValues}) => {
//     const handleChange = e => setFormValues({...formValues, [`${label}`]: e.target.value} )
//
//     return (
//         <div>
//             <h4>{label}</h4>
//             <input value={formValues[`${label}`]} className="glow-border" type={type} form="form" onChange={handleChange} required/>
//
//         </div>
//
//     )
// }