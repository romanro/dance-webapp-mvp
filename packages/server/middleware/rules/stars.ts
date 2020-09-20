import { Errors } from "../../shared/erros";

const { param } = require('express-validator');

export const rules_get_star_by_id = [
    param("starId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]