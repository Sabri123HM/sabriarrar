const serverless = require('serverless-http');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const app = express();
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const { smtpHost, smtpUser, smtpPass } = process.env;

const mailTransport = nodemailer.createTransport({
  host: smtpHost,
  port: 465,
  secure: true,
  auth: {
    user: smtpUser,
    pass: smtpPass,
  },
});

const ORIGIN = 'https://sabria.com';
const MAX_EMAIL_LENGTH = 512;
const MAX_MESSAGE_LENGTH = 4096;

app.use(helmet());
app.use(express.json());
app.use(cors({ origin: ORIGIN }));

app.post('/message', async (req, res) => {
  try {
    const email = DOMPurify.sanitize(req.body.email);
    const message = DOMPurify.sanitize(req.body.message);

    // Reject unsupported origins
    if (req.headers.origin !== ORIGIN) {
      throw new Error(`Unsupported origin: ${req.headers.origin}`);
    }

    // Validate email request
    if (!email || !/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
      return res.status(400).json({ error: 'Entrez un mail valide' });
    } else if (!message) {
      return res.status(400).json({ error: 'Entrez un message' });
    } else if (email.length > MAX_EMAIL_LENGTH) {
      return res.status(400).json({
        error: `Entrez un email avec ${MAX_EMAIL_LENGTH} caractères`,
      });
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Entrez un message avec ${MAX_MESSAGE_LENGTH} caractères`,
      });
    }

    // Send email
    const mailOptions = {
      from: `Portfolio <contact@sabriarrar.fr>`,
      to: 'contact@sabriarrar.fr',
      subject: `Nouveau message de ${email}`,
      text: `From: ${email}\n\n${message}`,
    };

    await mailTransport.sendMail(mailOptions);

    return res.status(200).json({ message: 'Message correctement envoyé' });
  } catch (error) {
    console.error('Rejected', error);
    return res.status(500).json({ error: 'Message refusé' });
  }
});

module.exports.handler = serverless(app);
