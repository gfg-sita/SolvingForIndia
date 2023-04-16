const twilio = require('twilio');
const nodemailer = require('nodemailer');
const speakeasy = require('speakeasy');

const twilioClient = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const sendSMS = async (to, body) => {
  try {
    await twilioClient.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    console.log('SMS sent successfully');
  } catch (error) {
    console.error('Error sending SMS:', error);
  }
};

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_EMAIL,
    to,
    subject,
    text,
  };

  try {
    await mailTransport.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

exports.sendCode = async (mobile_number, email) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const code = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
  });

  if (mobile_number) {
    await sendSMS(mobile_number, `Your verification code is: ${code}`);
  }

  if (email) {
    await sendEmail(email, 'Verification Code', `Your verification code is: ${code}`);
  }

  return {
    secret: secret.base32,
    code,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
  };
};

exports.verifyCode = async (code, secret) => {  
  const isCodeValid = speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token: code,
    window: 2
  });

  return isCodeValid;
};