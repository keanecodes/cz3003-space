const { db } = require('../util/admin');
const firebaseConfig = require('../util/config');
const firebase = require('firebase');
const FieldValue = require('firebase-admin').firestore.FieldValue;
firebase.initializeApp(firebaseConfig);

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

  console.log(newUser.email)

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
        sprite: "pWHT",
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

exports.updateScore = (req, res) => {
  let {id, points} = req.body.params;

  try {
    db.collection("users")
    .where("userId","==",id)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(document) {
       document.ref.update({score: FieldValue.increment(points)}); 
      });
    });

    // db.collection("gameplays")
    // .where("userId","==",id)
    // .add({ progress: progress });

    return res.status(200).json({message: "Score updated"});
    
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({message: error});
  }
}

exports.getScore = (req, res) => {

  let data = [];

  try {
    db.collection("users")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        if (!doc.exists) {
          return res.status(400).json({ message:'No users' });
        } 
        else {
          if(doc._fieldsProto.isProfessor === undefined)
            // console.log(doc._fieldsProto.isProfessor)
            data.push(doc._fieldsProto);
        }
      });
      return res.status(200).json(data);
    });
   
    
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({message: error});
  }
}

exports.updateProgress = (req, res) => {

  let {topic, subtopic, totalTries, points, id} = req.body.params;
  console.log(topic+subtopic+totalTries+id);

  try {

    db.collection("gameplays")
      .doc(id)
      .get()
      .then((doc) => {
        if(!doc.exists){
          db.collection("gameplays")
            .doc(id)
            .set({})
        }
        doc.ref
          .collection(topic)
          .doc(subtopic)
          .set({
            tries: totalTries
          });
      })
    

    db.collection("gameplays")
      .doc(id)
      .collection(topic)
      .doc("score")
      .get()
      .then((doc) => {
        console.log(doc.data())
        
        if(doc.exists){
          if(doc.data().totalScore<300){
            console.log("inc")
            doc.ref.update({
                totalScore: FieldValue.increment(points)
              });
          }
          
        } else {
          console.log("set")
          db.collection("gameplays")
          .doc(id)
          .collection(topic)
          .doc("score")
          .set({
            totalScore: FieldValue.increment(points)
          });
        }
      })

    return res.status(200).json({message:"Updated gameplay"});

    
  } catch (error) {
    
    console.log(error);
    return res.status(500).json({message: error});
  }
}

exports.getProgress = async (req, res) => {

  let {topic, subtopic} = req.query;
  // console.log(req);

 
  let data=[];
  let promise = new Promise( async (resolve, reject) => {
    db.collection("gameplays").get()
      .then( async (snapshot) => {
        // console.log(snapshot)
        await Promise.all(
          snapshot.docs.map( async (doc) => {
          console.log(doc.id)
          await db.collection("gameplays")
            .doc(doc.id)
            .collection(topic)
            .doc(subtopic)
            .get()
            .then( async (snapshot) => {
              data.push({
                userId: doc.id,
                tries: snapshot.data().tries
              })
              console.log(snapshot.data())
              
            }).catch(err => {
              console.log("Error getting sub-collection documents", err);
            })
          })
        );
        
        console.log("resolved")
        return resolve();
      
      }).catch(err => {
      console.log("Error getting documents", err);
    }) 
  })

  promise.then(() => {
    console.log(data)
    return res.status(200).json(data);
  }).catch(err => {
    console.log("Error returning data", err);
    return res.status(500).json({message: err});

  })
    
 
}


exports.getTopicScore = async (req, res) => {

  let {topic} = req.query;
  console.log(req);

 
  let data=[];
  let promise = new Promise( async (resolve, reject) => {
    db.collection("gameplays").get()
      .then( async (snapshot) => {
        // console.log(snapshot)
        await Promise.all(
          snapshot.docs.map( async (doc) => {
          console.log(doc.id)
          await db.collection("gameplays")
            .doc(doc.id)
            .collection(topic)
            .doc("score")
            .get()
            .then( async (snapshot) => {
              data.push({
                userId: doc.id,
                score: snapshot.data().totalScore
              })
              console.log(snapshot.data())
              
            }).catch(err => {
              console.log("Error getting sub-collection documents", err);
            })
          })
        );
        
        console.log("resolved")
        return resolve();
      
      }).catch(err => {
      console.log("Error getting documents", err);
    }) 
  })

  promise.then(() => {
    console.log(data)
    return res.status(200).json(data);
  }).catch(err => {
    console.log("Error returning data", err);
    return res.status(500).json({message: err});

  })
    
 
}