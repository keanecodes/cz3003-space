const { db } = require('../util/admin');

exports.getTopics = (req, res) => {
    const data = [];
    db.collection('questions')
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (!doc.exists) {
                    return res.status(400).json({ message:'No topics available' });
                } else {
                    data.push(doc._ref._path.segments);
                }
            });
            console.log(data);
            return res.status(200).json(data);
        });

}

exports.getSubtopics = (req, res) => {
    console.log(req.query[0]);
    const topic = req.query[0];

    const data = [];
    db.collection('questions')
        .doc(topic)
        .listCollections()
        .then((snapshot) => {
            if(snapshot.length > 0)
            {
                snapshot.forEach((doc) => {
                    data.push(doc._queryOptions.collectionId);
                });
            } else {
                return res.status(400).json({ message:'No subtopics available' });
            }

            console.log(data);
            return res.status(200).json(data);
        });

}

exports.getQuestions = (req, res) => {
    const {topic, subtopic} = req.query;
    const data = [];
    db.collection('questions')
        .doc(topic)
        .collection(subtopic)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                if (!doc.exists) {
                    return res.status(400).json({ message:'No questions available' });
                } else {

                    if(doc.data().question)
                        // console.log(doc._fieldsProto);
                    {
                        console.log(doc.data());
                        data.push(doc.data());
                    }

                }
            });
            return res.status(200).json(data);
        });
}

exports.getSubtopicsDifficulty = async (req, res) => {
    
  const {topic, subtopics} = req.query;
  // console.log(req);

  let data = [];
  // subtopics.forEach((subtopic) => {
  //   db.collection('questions')
  //   .doc(topic)
  //   .collection(subtopic)
  //   .doc('difficulty')
  //   .get()
  //   .then((doc) => {
      
  //       if (!doc.exists) {
  //         return res.status(400).json({ message:'No questions available' });
  //       } else {
  //           console.log(doc._fieldsProto.value.stringValue)
  //           console.log(data)
  //           data.push({
  //             [subtopic]: doc._fieldsProto.value.stringValue
  //           });
  //       }
  //   });
  // });


  await Promise.all(subtopics.map(async (subtopic) => {
    await db.collection('questions')
    .doc(topic)
    .collection(subtopic)
    .doc('difficulty')
    .get()
    .then((doc) => {
      
        if (!doc.exists) {
          return res.status(400).json({ message:'No questions available' });
        } else {
            console.log(doc._fieldsProto.value.stringValue)
            console.log(data)
            data.push({
              subtopic: subtopic,
              difficulty: doc._fieldsProto.value.stringValue
            });
        }
    });
  }));

  console.log(data)
  return res.status(200).json(data);

  
  
}

exports.createSubtopic = (req, res) => {

    const {question,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2,
        incorrect_answer3,
        topic,
        subtopic,
        difficulty} = req.body;

    console.log(subtopic+" "+topic);

    db.collection('questions')
        .doc(topic)
        .collection(subtopic)
        .add({
            question: question,
            correct_answer: correct_answer,
            incorrect_answers: [incorrect_answer1, incorrect_answer2, incorrect_answer3],
            difficulty: difficulty
        })
        .then((data) => {
            console.log(data.id);
            return res.status(200).json( {message: "Subtopic created"} );
        }).catch((err) => {
        console.log(err)
    });


}

exports.createQuestion = (req, res) => {

    const {question,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2,
        incorrect_answer3,
        topic,
        subtopic,
        difficulty} = req.body;

    db.collection('questions')
        .doc(topic)
        .collection(subtopic)
        .add({
            question: question,
            correct_answer: correct_answer,
            incorrect_answers: [incorrect_answer1, incorrect_answer2, incorrect_answer3],
            difficulty: difficulty
        })
        .then((data) => {
            console.log(data.id);
            return res.status(200).json( {message: "Question created"} );
        }).catch((err) => {
        console.log(err)
        return res.status(400).json( {message: err} );
    });

}

exports.editQuestion = (req, res) => {
    const {question,
        newQuestion,
        correct_answer,
        incorrect_answer1,
        incorrect_answer2,
        incorrect_answer3,
        topic,
        subtopic,
        difficulty} = req.body;

    let edited = [];

    let collectionRef = db.collection('questions').doc(topic).collection(subtopic);

    collectionRef
        .where('question', '==', question).get()
        .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    collectionRef.doc(doc.id).update({
                        question: newQuestion,
                        correct_answer: correct_answer,
                        incorrect_answers: [incorrect_answer1, incorrect_answer2, incorrect_answer3],
                        difficulty: difficulty
                    })
                        .then((data) => {
                            edited.push(doc.id)
                            let returnMessage = (edited.length > 0) ? 'successfully edited ' + edited : 'no questions matching query found.'
                            return res.status(200).json(returnMessage)
                        }).catch((err) => {
                        console.log(err);
                        return res.status(400).json(err)
                    });
                })
            }

        )
}

exports.deleteQuestion = (req, res) => {
    const {
        question,
        topic,
        subtopic
    } = req.body;

    let deleted = [];

    let collectionRef = db.collection('questions').doc(topic).collection(subtopic);

    collectionRef.where('question', '==', question).get()
        .then(querySnapshot => {
            if (querySnapshot.docs.length > 0){
                querySnapshot.forEach(doc=>{
                    doc.ref.delete().then(()=>{
                        console.log(doc.id + 'deleted');
                        deleted.push(doc.id);

                        let returnMessage = (deleted.length > 0) ? 'successfully deleted file' : 'no questions matching query found.'
                        return res.status(200).json(returnMessage);
                    }).catch(e=>{
                        return res.status(400).json(e);
                    })
                })
            }
            else{
                return res.status(400).json('no questions matching query found.')
            }
        });
}

