const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendVerifyEmail = async (to, token) => {
  const mailOptions = {
    to,
    from: 'hello@danskill.com',
    subject: 'Please verify your email address',
    text: `Thank you for registering.\n\n
      This verify your email address please click on the following link, or paste this into your browser:\n\n
      ${process.env.BASE_URL}/account/verify/${token}\n\n
      \n\n
      Thank you!`
  };

  return sgMail.send(mailOptions);
};
