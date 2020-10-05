import nodemailer from 'nodemailer';
import EmailTemplate, { EmailConfig } from 'email-templates';

interface Locals {
  token?: string,
  baseUrl?: string
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

// TODO: trace log messages are needed here?

const emailConfig: EmailConfig = {
  message: {
    from: process.env.NODEMAILER_USER
  },
  send: true,
  preview: false,
  transport: transporter,
}

const email = new EmailTemplate<Locals>(emailConfig);

export const sendVerifyEmail = async (toMail: string, token: string) => {
  const locals: Locals = {
    token: token,
    baseUrl: process.env.BASE_URL
  };

  await email.send({
    template: 'VerifyEmail',
    message: {
      to: toMail,
    },
    locals: locals
  })
}

export const sendForgotPasswordEmail = async (toMail: string, token: string) => {
  const locals: Locals = {
    token: token,
    baseUrl: process.env.BASE_URL
  };

  await email.send({
    template: 'ForgotPassword',
    message: {
      to: toMail,
    },
    locals: locals
  })
}

export const sendResetPasswordEmail = async (toMail: string) => {
  const locals: Locals = {
    baseUrl: process.env.BASE_URL
  };

  await email.send({
    template: 'ResetPassword',
    message: {
      to: toMail,
    },
    locals: locals
  })
}
