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
} = require("./handlers/users");

const {
  setQuestionInTopic,
  getTopic,
  getAllTopics,
  renameQuestionInTopic,
  addQuestionInTopic,
} = require("./handlers/topics");

// Users route
app.post('/register', register);
app.post('/login', login);
app.post('/reset', resetPassword);
app.post('/user', authMiddleware, addUserDetails);
app.get('/user', authMiddleware, getAuthenticatedUser);

app.post('/modify_question', setQuestionInTopic);
app.post('/add_question', addQuestionInTopic);
app.post('/rename_question', renameQuestionInTopic);
app.get('/get_topic', getTopic);
app.get('/get_all_topics', getAllTopics)



// exports.getDonations = functions.https.onRequest((req, res) => { });
// https://baseurl.com/api/_____
exports.api = functions.region("asia-southeast2").https.onRequest(app);

