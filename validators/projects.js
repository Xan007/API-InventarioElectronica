import { body } from "express-validator"
import validateSchema from "../middleware/validateSchema.js"

export const validateCreation = [
    body("title")
        .exists()
        .notEmpty(),
    body("about")
        .optional(),
    function (req, res, next) {
        validateSchema(req, res, next)
    }
]