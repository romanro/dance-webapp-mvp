import User from "../../models/User";
import { Errors } from "../../shared/erros";

const { body, param } = require('express-validator');


export const rules_verifyEmailToken = [
    param("token", Errors.INVALID_EMAIL_TOKEN).isHexadecimal(),
]

export const rules_updatePassword = [
    body("password", Errors.INVALID_PASSWORD).isLength({ min: 6 }),
    body('confirmPassword')
        .custom((value: string, { req }: any) => {
            if (value !== req.body.password) {
                throw new Error(Errors.PASSWORD_MISMATCH);
            }
            return true;
        })
]