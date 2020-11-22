const moment = require("moment");
const { sendMail } = require('./mail/mail');
const { fillForm } = require('./form');

const getVacationTypes = async () => Promise.resolve(
    [{ type: "annual", name: "Paid annual leave" },
    { type: "unpaid", name: "Unpaid annual leave" },
    { type: "blood", name: "Blood donation leav" }
    ]);

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
        value: data['profession'] || "N/A",
        name: 'profession'
    })

    const requestDate = moment().format('MM/DD/YYYY');
    form.fields.push({
        name: 'requestDate',
        value: requestDate,
    });
    if (form.type === 'annual') {
        const [startDateRaw, endtDateRaw] = data['date'].replace("from" , "").replace(" to " , "T").split("T");
        form.fields.push({
            name: 'startDate',
            value: moment(startDateRaw).format('MM/DD/YYYY'),
        });
        form.fields.push({
            name: 'endDate',
            value: moment(endtDateRaw).format('MM/DD/YYYY'),
        });
    }
    return fillForm(form)
        .then((content) => sendMail({ to: email, content, contex: { fullName, requestDate } }));
}

module.exports = { getVacationTypes, requestVacation };