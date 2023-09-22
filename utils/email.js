/* eslint-disable import/no-extraneous-dependencies */
const nodeemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodeemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: 'lcy <licy@mail1.edu.cn>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
