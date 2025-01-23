// src/firebase.js

const admin = require('firebase-admin');
const serviceAccount = require('./railmadad-2395b-firebase-adminsdk-fzid0-4e8461c59d.json'); // Replace with the path to your service account file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();

module.exports = { auth };
