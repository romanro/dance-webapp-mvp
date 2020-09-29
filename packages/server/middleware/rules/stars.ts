import { Errors } from "../../shared/erros";
import { param } from 'express-validator';

export const rules_getStarById = [
    param("starId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]