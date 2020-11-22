const moment = require("moment");

// a) Ziua de start nu poate fi zi de weekend sau sarabtoare legala
// b) Data nu trebuie sa fie egal cu start date, macar cu o zi inainte
const annual = ({ startDateRaw, endDateRaw }) => {
    const startDate = moment(startDateRaw);
    const endDate = moment(endDateRaw);

    if (!endDate.isAfter(startDate) || startDate.weekday(Number) > 5 || endDate.weekday(Number) > 5) {
        throw new InvalidDateError(startDate);
    }
}

module.exports = { annual }