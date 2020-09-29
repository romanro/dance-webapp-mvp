import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// TODO: should be moved to .env
const FROM = 'hello@danskill.com';


// TODO: mail templates should be added
export const sendVerifyEmail = async (toMail: string, token: string) => {
  const mailOptions = {
    to: toMail,
    from: FROM,
    subject: 'Please verify your email address',
    text: `Thank you for registering.\n\n
      This verify your email address please click on the following link, or paste this into your browser:\n\n
      ${process.env.BASE_URL}/account/verify/${token}\n\n
      \n\n
      Thank you!`
  };

  return sgMail.send(mailOptions);
};

export const sendForgotPasswordEmail = async (toMail: string, token: string) => {
  const mailOptions = {
    to: toMail,
    from: FROM,
    subject: 'Reset your password',
    text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${process.env.BASE_URL}/reset/${token}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
  return sgMail.send(mailOptions);
};

export const sendResetPasswordEmail = async (toMail: string) => {
  const mailOptions = {
    to: toMail,
    from: FROM,
    subject: 'Your password has been changed',
    text: `Thank you for registering.\n\n
    Hello,\n\nThis is a confirmation that the password for your account ${toMail} has just been changed.\n
    \n\n
    Thank you!`
  };

  return sgMail.send(mailOptions);
};
