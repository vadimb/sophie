const functions = require('firebase-functions');

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send("OK"));

exports.api = functions.https.onRequest(app);