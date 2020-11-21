const functions = require('firebase-functions');
const apiRouter = require('./src/routes');
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const { PDFDocument }  = require('pdf-lib');
app.use(cors({ origin: true }));

const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: 'in-v3.mailjet.com',
  port: 587,
  secure: false,
  auth: {
      user: '970cd4d7e3395f019edf4991b327663f',
      pass: 'ee28b6edfa104ad80018ca45920ce286'
  }
});

const noContent = (res, status = 204) => res.status(status).end();

app.head('/v1/vacations', (req, res) => res.status(400)
  .json({
    message: "An error occured"
  })
  .end());

app.get('/v1/vacations', (req, res) => res.status(200).json([
    { type: "annual", name: "Paid annual leave" },
    { type: "unpaid", name: "Unpaid annual leave" },
    { type: "blood", name: "Blood donation leav" }
  ]).end());

app.post('/v1/vacations', (req, res) => fillForm().then(noContent()));

async function fillForm() {
  try {
    const bucket = admin.storage().bucket("sophie-ed24f.appspot.com");
    const filename = "templates/annual.pdf";
    const file = bucket.file(filename);
    const bucketFileStream = await file.download();
    const pdfDoc = await PDFDocument.load(bucketFileStream[0])
    const form = pdfDoc.getForm()
  
    // // functions.logger.log(form.getFields()[0].getName())
    // const employeeFullName = form.getTextField('EmployeeFullName')
    // const employeeProfession = form.getTextField('EmployeeProfession')
    // const vacationStartDate = form.getTextField('VacationStartDate')
    // const vacationEndDate = form.getTextField('VacationEndDate')
    // const requestSignDate = form.getTextField('RequestSignDate')

    // // Fill in the basic info fields
    // employeeFullName.setText('Mario Ursu')
    // employeeProfession.setText('Inginer')
    // vacationStartDate.setText('20/10/2020')
    // vacationEndDate.setText('25/10/2020')
    // requestSignDate.setText('19/10/2020')

    // const f = bucket.file("templates/test.pdf");
    // await f.save(await pdfDoc.save(), {
    //   metadata: { contentType: 'application/pdf' },
    //   });

    const mailOptions = {
      from: 'vadim.batin@gmail.com', // Something like: Jane Doe <janedoe@gmail.com>
      to: "vadimb@grappex.com",
      subject: 'Hello', // email subject
      html: `<p style="font-size: 16px;">test it!!</p>
            <br />`
      , attachments: [
        {  
          filename: 'form.pdf',
          content:  await pdfDoc.save(),
        }
      ],
    };

    // returning result
    await transporter.sendMail(mailOptions);

  } catch (error) {
    functions.logger.error(error);
  }
}

// app.use('/v1', apiRouter);

exports.api = functions.https.onRequest(app);