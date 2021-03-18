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
    
    const {topic, subtopic, level} = req.query;

    const data = [];
    db.collection('questions')
    .doc(topic)
    .collection(subtopic)
    .where("difficulty","==", level)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (!doc.exists) {
          return res.status(400).json({ message:'No questions available' });
        } else {
          data.push(doc._fieldsProto);
        }
      });
      console.log(data);
      return res.status(200).json(data);
    });

}

exports.createSubtopic = (req, res) => {

  const {subtopic, topic} = req.body
  console.log(req);


  db.collection('questions')
    .doc(topic)
    .collection(subtopic)
    .set({});
  
  return res.status(200).json( {message: "Subtopic created"} );

}

exports.createQuestion = (req, res) => {
    
  const {question, 
        correct_answer, 
        incorrect_answer1, 
        incorrect_answer2, 
        incorrect_answer3, 
        subtopic,
        difficulty} = req.body;

    console.log(req);

}

