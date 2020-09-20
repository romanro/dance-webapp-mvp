import { Errors } from "../../shared/erros";

const { body, param } = require('express-validator');

export const rules_get_star_figures = [
    param("starId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]

export const rules_get_all_star_figures = [
    param("starId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]

export const rules_get_figure_by_id = [
    param("figureId", Errors.INVALID_MONGO_ID).matches("^[0-9a-fA-F]{24}$"),
]