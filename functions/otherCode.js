// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// const firebaseHelper = require('firebase-functions-helper');
// const express = require('express');
// const bodyParser = require('body-parser');

// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();

// const app = express();
// const main = express();

// main.use('/api/v1', app);
// main.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false }));

// const contactsCollection = 'contacts';
// const factsCollection = 'facts';

// // Add new contact
// app.post('/contacts', (req, res) => {
//   firebaseHelper.firestore.creatNewDocument(db, contactsCollection, req.body);
//   res.send('Create a new contact');
// });

// // Update new contact
// app.patch('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore.updateDocument(
//     db,
//     contactsCollection,
//     req.params.contactId,
//     req.body
//   );
//   res.send('Update a new contact');
// });

// // View a contact
// app.get('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore
//     .getDocument(db, contactsCollection, req.params.contactId)
//     .then(doc => res.status(200).send(doc))
//     .catch(error => console.log(error));
// });

// // View all contacts
// app.get('/contacts', (req, res) => {
//   firebaseHelper.firestore
//     .backup(db, contactsCollection)
//     .then(data => res.status(200).send(data))
//     .catch(error => console.log(error));
// });

// // Delete a contact
// app.delete('/contacts/:contactId', (req, res) => {
//   firebaseHelper.firestore.deleteDocument(
//     db,
//     contactsCollection,
//     req.params.contactId
//   );
//   res.send('Contact is deleted');
// });

// // View all contacts
// app.get('/facts', (req, res) => {
//   firebaseHelper.firestore
//     .backup(db, factsCollection)
//     .then(data => res.status(200).json(data))
//     .catch(error => console.log(error));
// });

// exports.webApi = functions.https.onRequest(main);