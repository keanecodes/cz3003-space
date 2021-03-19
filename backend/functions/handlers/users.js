const { db } = require('../util/admin');
const config = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(config);

const {
  validateSignupData,
  validateLoginData,
  reduceUserDetails
} = require('../util/validators');

// Sign users up
exports.register = (req, res) => {
  const newUser = {
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateSignupData(newUser);

  if (!valid) return res.status(400).json(errors);

  let token, userId;
  db.collection('users')
      .where('displayName', '==', req.body.displayName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ email: 'This display name is already used' });
        } else {
          return firebase
              .auth()
              .createUserWithEmailAndPassword(newUser.email, newUser.password)
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;

        var user = firebase.auth().currentUser
        if (user != null) {
          user.updateProfile({
            displayName: newUser.displayName
          }).then(function() {
            // Update successful.
          }, function(errors) {
            return res.status(400).json(errors);
          });
        }

        const userCredentials = {
          displayName: newUser.displayName,
          email: newUser.email,
          createdOn: new Date().toISOString(),
          sprite: "purple",
          score: 0,
          playerStartX: 330,
          playerStartY: 100,
          userId
        };
        return db.doc(`/users/${userId}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === 'auth/email-already-in-use') {
          return res.status(400).json({ email: 'Email is already is use' });
        } else {
          return res
              .status(500).json({ general: 'Something went wrong, please try again' });
        }
      });
};

exports.resetPassword = (req, res) => {
  // Reset Your SPACE Account Password
  // <p>Hey there!</p>
  // <p>Follow this <a href='%LINK%'>link</a> to reset your SPACE password.</p>
  // <p>If you didn’t ask to reset your password, you can ignore this email.</p>

  // Action URL (%LINK% value)
  // https://cz3003-space.firebaseapp.com/__/auth/action


  firebase.auth().sendPasswordResetEmail(req.body.email)
      .then(function() {
        return res.status(200).json({ message: 'Password reset email sent!' });
      })
      .catch(function(err) {
        return res.status(400).json(err);
      });
};

// Log user in
exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  const { valid, errors } = validateLoginData(user);

  if (!valid) return res.status(400).json(errors);

  firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        userData = data.user
        return userData.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        return db.doc(`/users/${userData.uid}`).update({lastLoginOn: new Date().toISOString()});
      })
      .then(() => {
        return res.json({ token });
      })
      .catch((err) => {
        console.error(err);
        // auth/wrong-password
        // auth/user-not-user
        return res
            .status(403)
            .json({ general: 'Wrong credentials, please try again' });
      });
};

// Add user details
exports.addUserDetails = (req, res) => {
  let userDetails = reduceUserDetails(req.body);

  db.doc(`/users/${req.user.userId}`)
      .update(userDetails)
      .then(() => {
        return res.json({
          message: userDetails.displayName + "'s data added successfully",
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
};

// Get own user details
exports.getAuthenticatedUser = (req, res) => {
  let userData = {};
  db.doc(`/users/${req.user.userId}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          // 1. Set User's Data
          userData.bio = doc.data();
          // 2.1 Query User's Data in GAMEPLAYS collection
          return db
              .collection('gameplays')
              .where('playerId', '==', req.user.userId)
              .get();
        }
      }).then((data) => {
    // 2.2 Set User's GAMEPLAYS Data
    userData.gameplays = [];
    data.forEach((doc) => {
      userData.gameplays.push(doc.data());
    });

    // 3.2 Query User's Data in QUESTIONS collection
    return db
        .collection('questions')
        .where('createdBy', '==', req.user.userId)
        .get();

  }).then((data) => {
    // 3.3 Set User's QUESTIONS Data
    userData.questions = [];
    data.forEach((doc) => {
      userData.questions.push(doc.data());
    });

    // 4 Return response
    return res.json(userData);
  })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
};