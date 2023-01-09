import { body } from "express-validator"
import { isValidObjectId } from "mongoose"

import validateSchema from "../middleware/validateSchema.js"

const isArrayOfIDs = (array) => array.every((id) => isValidObjectId(id))

export const validateCreation = [
    body("title"),
    body("about"),
    body("components")
        .isArray()
        .custom(isArrayOfIDs),
    function (req, res, next) {
        validateSchema(req, res, next)
    }
]