const functions = require('firebase-functions');
const express = require('express');
const firebaseHelper = require('firebase-functions-helper');
const app = express();
const bodyParser = require('body-parser');
const contactsApi = require('./api/contacts');
const CONST = require('./config/constants');
require('./config/db');

app.use('/contacts', contactsApi.contactsRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/timestamp', (request, response) => {
  response.send(`${Date.now()}`);
});

app.get('/timestamp-cached', (request, response) => {
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  response.send(`${Date.now()}`);
});

app.post(CONST.END_POINTS.FACTS, (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, 'facts', req.body);
  response.set('Cache-Control', 'public, max-age=300, s-max-age=600');
  res.send('created successfully');
});

app.get('/facts', (req, res) => {
  firebaseHelper.firestore
    .backup(db, 'facts')
    .then(data => res.status(200).json(data))
    .catch(error => console.log(error));
});

app.post('/facts', (req, res) => {
  firebaseHelper.firestore.creatNewDocument(db, 'facts', req.body);
  res.send('created successfully');
});

app.get('*', (req, res) => {
  res.status(404).json({ error: 'This route does not exist.' });
});

exports.api = functions.https.onRequest(app);
