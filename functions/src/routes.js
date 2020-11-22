const express = require('express');

const { requestVacation } = require('./modules/vacations');

const { validationErrorHandler } = require('./modules/errors');

const router = express.Router();

router.post('/vacations', (req, res) => {
    const form = req.body;
    return requestVacation(form)
        .then(() => res.status(200).end())
        .catch((error) => validationErrorHandler(error, req, res));
});

module.exports = router;