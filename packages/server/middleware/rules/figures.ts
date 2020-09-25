import { Errors } from "../../shared/erros";

const { param } = require('express-validator');

export const rules_getStarFigures = [
    param("starId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]

export const rules_getAllStarFigures = [
    param("starId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]

export const rules_getFigureById = [
    param("figureId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]