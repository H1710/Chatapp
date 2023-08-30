const nodemailer = require('nodemailer');

const sendVerificationEmail = async (email, OTP) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'huyqhse172520@fpt.edu.vn',
      pass: 'eiovjibwgsfhbqgf',
    },
  });

  const mailOptions = {
    from: 'chat-app.com',
    to: email,
    subject: 'Email verification',
    text: `OTP code to verify your account: ${OTP}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log('Error sending verification email', error);
  }
};

module.exports = sendVerificationEmail;
