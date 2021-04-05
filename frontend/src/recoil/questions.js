import axios from 'axios'

export const getWorldsInfoQuestions = async (world) => {
  try {
    const topics = (await axios.get("/topics/info")).data
    const topicinfo = {[world]: {...topics[world], subtopics: {}}}
    const subs = await getSubtopics(topics[world]["topic_path"])
    const diffi = await getSubtopicsDifficulty(topics[world]["topic_path"], subs);
    diffi.map(d => topicinfo[world].subtopics[d.subtopic] = d.difficulty )
    return topicinfo
  } catch (err) {
    console.error("Error: Can't get World Info and Questions", err.response.data)
    return {}
  }
}

export const getTopics = async () => {
  try {
    const { data } = await axios.get("/topics")
    return data.map(e => e[1])
  } catch (err) {
    console.error("Error: Can't get topics. Either there's none, or there's an API issue.", err.response.data)
    return []
  }
}

export const getSubtopics = async (topic) => {
  try {
    const { data } = await axios.get("/subtopics", { params: topic })
    return data
  } catch (err) {
    console.error(`Error: Can't get subtopics for topic ${topic}.`, err.response.data)
    return []
  }
}

export const getSubtopicsDifficulty = async (topic, subtopics) => {
  try {
    const { data } = await axios.get("/subtopics/level", { params: { topic, subtopics } })
    return data
  } catch (err) {
    console.error(`Error: Can't get subtopics difficult for the subtopic ${subtopic}.`, err.response.data)
    return []
  } 
} 