const SMAPT_HOST = 'in-v3.mailjet.com';
const SMAPT_USER = '970cd4d7e3395f019edf4991b327663f';
const SMAPT_PASS = 'ee28b6edfa104ad80018ca45920ce286';

const EMAIL_FROM = 'vadim.batin@stefanini.com';
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