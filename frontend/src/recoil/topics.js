import axios from "axios";
import {isAbsolute} from "@protobufjs/path";

export const getAllQuestionsInTopic = (topic) => {
    return axios.get('/get_topic', {
        params: {
            topic: topic
        }
    });
}

export const getAllQuestionsFromAllTopics = () => {
    return axios.get('/get_all_topics', {
    });
}

export const changeQuestioninTopic = (topic, oldQuestion, newQuestion) => {
    return axios.post('/rename_question', {
        topic: topic,
        oldquestion: oldQuestion,
        newquestion: newQuestion
    });
}

export const addQuestioninTopic = (topic, question, answer, options) => {
    return axios.post('/add_question',{
        topic: topic,
        question: question,
        answer: answer,
        options: options
    })
}

export const modifyQuestioninTopic = (topic, question, answer, options) => {
    if (options.length > 0){
        return axios.post('/modify_question',{
            topic: topic,
            question: question,
            answer: answer,
            options: options
        })
    }

    else{
        console.warn('options passed in modifyQuestioninTopic is not type array')
        return axios.post('/modify_question',{
            topic: topic,
            question: question,
            answer: answer,
        })
    }
}