const { PDFDocument }  = require('pdf-lib');
const { TEMPLATES } = require('../config');

const admin = require('firebase-admin');

const fillForm = async ({ type, fields }) => {
    const bucket = admin.storage().bucket("sophie-ed24f.appspot.com");
    const file = bucket.file(TEMPLATES[type]);
    const response = await file.download();
    const pdfDoc = await PDFDocument.load(response[0])
    const form = pdfDoc.getForm()
    fields.forEach(({ name, value }) => form.getTextField(name).setText(value));
    return await pdfDoc.save()
}

module.exports = { fillForm }