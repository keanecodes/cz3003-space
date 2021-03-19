const { db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');

const {
    validateSignupData,
    validateLoginData,
    reduceUserDetails
} = require('../util/validators');

// Read Methods

//get a topic and all its questions
exports.getTopic = async (req, res) => {
    let queryParam = req.query.topic

    if (!queryParam){
        return res.status(400).json("No topic entered.");
    }
    let doc = await db.collection("topics").doc(queryParam).get()

    if (doc.exists) {
        return res.json(doc.data());

    } else {
        return res.status(400).json("Specified topic does not exist in db.");
    }
}

// get all topics currently in db
exports.getAllTopics = async (req, res) => {
    let topicsSnapshot = await db.collection("topics").get()
    let output = []

    topicsSnapshot.forEach(doc => {
        let obj = {
            name: doc.id,
            ...doc.data()
        }
        output.push(obj);
    })
    return res.json(output);
}

// add a question with answer and options
// or edit answer/options in question (use renameQuestionInTopic to change the question)
exports.setQuestionInTopic = async (req, res) => {
    let queryTopic = req.query.topic
    let queryQuestion = req.query.question
    let queryAnswer = req.query.answer
    let queryOptions;
    if (req.query.options){
        queryOptions = req.query.options.split(',');
    }

    let questionData;

    const topicRef = await db.collection('topics').doc(queryTopic);

    if (!queryAnswer || !queryOptions){
        const doc = await topicRef.get();
        questionData = doc.data()
        if (questionData){
            queryAnswer = queryAnswer || questionData[queryQuestion]['Answer']
            queryOptions = queryOptions || questionData[queryQuestion]['Options']
        }
        else{
            return req.status(400).json("Missing answer or options in query")
        }

    }

    let questionObj = {
        [queryQuestion]:{
            'Answer': queryAnswer,
            'Options': queryOptions,
        }
    };

    const output = await topicRef.update(questionObj);

    return res.json(output);
}

exports.addQuestionInTopic = async(req, res) => {
    let queryTopic = req.query.topic
    let queryQuestion = req.query.question
    let queryAnswer = req.query.answer
    let queryOptions;
    if (req.query.options){
        queryOptions = req.query.options.split(',');
    }

    const topicRef = await db.collection('topics').doc(queryTopic);

    let questionObj = {
        [queryQuestion]:{
            'Answer': queryAnswer,
            'Options': queryOptions,
        }
    };

    const output = await topicRef.update(questionObj);

    return res.json(output);
}

exports.renameQuestionInTopic = async (req, res) =>{
    let queryTopic = req.query.topic
    let oldName = req.query.oldquestion
    let newName = req.query.newquestion
    console.log(queryTopic,oldName,newName)

    let docRef = db.collection("topics").doc(queryTopic);
    let doc = await docRef.get()
    if (doc && doc.exists){
        let data = doc.data()[oldName]
        console.log(data);
        try{
            let questionObj = {
                [newName]:{
                    'Answer': data['Answer'],
                    'Options': data['Options'],
                }
            }
            var output = await docRef.set(questionObj);
            return res.json(output)
        }
        catch (e) {
            console.log(e);
            return res.status(400).json(e.toString());
        }



        // let output2 = docRef.update({
        //     [oldName]:  firebase.firestore.FieldValue.delete()
        // })
    }
}