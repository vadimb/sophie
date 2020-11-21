const express = require('express');

const { getVacations } = require('./modules/vacations');

const router = express.Router();

router.get('/vacations', (req, res) => getVacations());

module.exports = router;