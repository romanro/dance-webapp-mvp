import User from "../../models/User";
import { Errors } from "../../shared/erros";

const { body } = require('express-validator');

const is_mail_already_exists = async (email: string) => {
    const doesEailExists = await User.exists({ email: email });
    if (doesEailExists)
        return Promise.reject(Errors.MAIL_ALREADY_EXISTS);
}

export const rules_signup = [
    body('email')
      .isEmail()
      .withMessage(Errors.INVALID_EMAIL)
      .custom(is_mail_already_exists)
      .normalizeEmail(),
    body("password", Errors.INVALID_PASSWORD).isLength({ min: 6 }),
    body('confirmPassword')
    .custom((value: string, { req } : any) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
    // TODO: add validation for: birthDate, name
]

export const rules_login = [
    body("user_name", Errors.INVALID_USER_NAME).notEmpty(),
    body("password", Errors.INVALID_PASSWORD).notEmpty(),
]