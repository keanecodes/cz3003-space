const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');
app.use(cors());

const authMiddleware = require('./util/authMiddleware');

const {
  register,
  login,
  resetPassword,
  addUserDetails,
  getAuthenticatedUser,
  updateScore,
  getScore
} = require("./handlers/users");

const {
  getTopics,
  getSubtopics,
  getSubtopicsDifficulty,
  getQuestions,
  createSubtopic,
  createQuestion
} = require("./handlers/questions");

// Users route
app.post('/register', register);
app.post('/login', login);
app.post('/reset', resetPassword);
app.post('/user', authMiddleware, addUserDetails);
app.get('/user', authMiddleware, getAuthenticatedUser);
app.post('/score', authMiddleware, updateScore);
app.get('/user/score', authMiddleware, getScore)

//Questions route
app.get('/topics', getTopics);
app.get('/subtopics', getSubtopics);
app.get('/subtopics/level', getSubtopicsDifficulty);
app.get('/questions', getQuestions);
app.post('/create/subtopic', createSubtopic);
app.post('/create/question', createQuestion);




// exports.getDonations = functions.https.onRequest((req, res) => { });
// https://baseurl.com/api/_____
exports.api = functions.region("asia-southeast2").https.onRequest(app);

