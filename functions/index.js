const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//configs
const firebaseApp = firebase.initializeApp(functions.config().firebase);
const db = firebase.firestore();

function getFacts() {
  const ref = firebaseApp.database().ref('facts');
  return ref.once('value').then(snap => snap.val());
}

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  response.send(`${Date.now()}`);
});

app.get('/getfacts', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  getFacts()
    .then(facts => {
      return response.status(200).send({ facts });
    })
    .catch(error => {
      console.log(error);
    });
});

app.post('/facts', (req, res) => {
  firebaseHelper.firestore
      .creatNewDocument(db, 'facts', req.body);
  res.send();
})

exports.app = functions.https.onRequest(app);