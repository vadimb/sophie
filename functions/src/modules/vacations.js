const moment = require("moment");
const { sendMail } = require('./mail/mail');
const { fillForm } = require('./form');
const { HR_EMAIL } = require('../config');
const validator = require("./validator");
const { InvalidDateError } = require("./errors");

const requestVacation = async (data) => {
    const form = {
        type: data.type,
        fields: [],
    };
    const email = data['email'];
    const fullName = data['fullName'];
    form.fields.push({
        value: fullName,
        name: 'fullName'
    })
    form.fields.push({
        value: data['profession'],
        name: 'profession'
    })

    const requestDate = moment().format('MM/DD/YYYY');
    form.fields.push({
        name: 'requestDate',
        value: requestDate,
    });
    const [startDateRaw, endtDateRaw] = data['date'].replace("from", "").replace(" to ", "T").split("T");
    const startDate = moment(startDateRaw).format('MM/DD/YYYY');
    const endDate = moment(endtDateRaw).format('MM/DD/YYYY');

    if (endDate === startDate) {
        throw new InvalidDateError(startDate);
    }
    if (form.type === 'annual' || form.type === 'unpaid') {
        if(annual) {
            validator.annual({ startDateRaw, endDateRaw});
        }
        form.fields.push({
            name: 'startDate',
            value: startDate,
        });
        form.fields.push({
            name: 'endDate',
            value: endDate,
        });
    } else if (form.type === 'blood') {
        form.fields.push({
            name: 'startDate',
            value: startDate,
        });
    }
    return fillForm(form)
        .then((content) => sendMail({
            to: email,
            content,
            contex: { fullName, requestDate, hr: HR_EMAIL.MD }
        }));
}

module.exports = { requestVacation };