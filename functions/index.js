const functions = require('firebase-functions');
const apiRouter = require('./src/routes');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const moment = require("moment");

moment.locale('ro_md')

const app = express();

admin.initializeApp();

app.use(cors({ origin: true }));

app.use('/v1', apiRouter);

exports.api = functions.https.onRequest(app);