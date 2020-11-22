const express = require('express');

const { requestVacation } = require('./modules/vacations');

const { validationErrorHandler, errorHandler } = require('./modules/errors');

const router = express.Router();

const noContent = (res, status = 204) => res.status(status).end();

router.post('/vacations', (req, res) => {
    const form = req.body;
    return requestVacation(form)
        .then(() => noContent(res))
        .catch((error) => validationErrorHandler(error, req, res))
        .catch((error) => errorHandler(error, req, res));
});

module.exports = router;