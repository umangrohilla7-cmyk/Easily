import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (req, res, next) => {
  const { email, name } = req.body;

  // Transporter config (using ethereal/test credentials, update as needed)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Umangrohilla7@gmail.com', 
      pass: 'qlmlotnejjmugaos'
    }
  });

  const mailOptions = {
    from: 'Easily Jobs <no-reply@easily.com>',
    to: email,
    subject: 'Application Received - Easily Job Portal',
    text: `Hello ${name},\n\nYour application has been successfully submitted. Thank you for applying through Easily!`
  };

  try {
    // Non-blocking mail request
    transporter.sendMail(mailOptions);
  } catch (err) {
    console.log('Email delivery failed:', err);
  }
  next();
};