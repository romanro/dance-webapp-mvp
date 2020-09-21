import { Errors } from "../../shared/erros";

const { param } = require('express-validator');

export const rules_getVideoById = [
    param("videoId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]