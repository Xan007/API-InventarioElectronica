import { body } from "express-validator"

import validateSchema from "../middleware/validateSchema.js"

export const validateCreation = [
    body("name")
        .notEmpty()
        .exists(),
    body("quantity")
        .isNumeric()
        .exists(),
    function (req, res, next) {
        validateSchema(req, res, next)
    }
]