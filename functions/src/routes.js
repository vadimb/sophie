const express = require('express');
const functions = require('firebase-functions');

const { getVacationTypes, requestVacation } = require('./modules/vacations');

const router = express.Router();

const noContent = (res, status = 204) => res.status(status).end();

router.get('/vacations', (req, res) => {
    return getVacationTypes()
        .then((vacationTypes) => res.status(200).json(vacationTypes).end())
        .catch((err) => {
            functions.logger.error('Failed to process request. Reason: %s', err);
            res.status(500).end();
        });
});

router.post('/vacations', (req, res) => {
    const form = req.body;
    return requestVacation(form)
        .then(() => noContent(res))
        .catch((err) => {
            functions.logger.error('Failed to process form. Reason: %s', err);
            res.status(500).end();
        });
});

module.exports = router;