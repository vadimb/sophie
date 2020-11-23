const SMAPT_HOST = 'in-v3.mailjet.com';
const SMAPT_USER = 'd3a7ec23c02786349814a266b805fadb';
const SMAPT_PASS = '57fb395ba8194f38af8659439e540930';

const EMAIL_FROM = 'mihai.chitanu@stefanini.com';
const EMAIL_SUBJECT = 'eTime Vacation';

const TEMPLATES = {
    annual: "templates/annual.pdf",
    blood: "templates/blood.pdf",
    unpaid: "templates/unpaid.pdf",
};

const HR_EMAIL = {
    MD: "elena.suman@stefanini.com",
};

module.exports = {
    SMAPT_HOST,
    SMAPT_USER,
    SMAPT_PASS,
    EMAIL_FROM,
    EMAIL_SUBJECT,
    TEMPLATES,
    HR_EMAIL
};