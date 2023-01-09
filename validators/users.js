import { body } from "express-validator"

import validateSchema from "../middleware/validateSchema.js"

export const validateRegister = [
    body("name")
        .exists(),
    body("email")
        .exists()
        .isEmail(),
    body("password")
        .exists(),
    function (req, res, next) {
        validateSchema(req, res, next)
    }
]

export const validateLogin = [
    oneOf([
        check("name").exists(),
        check("email").exists().isEmail(),
    ], "Email or name is required to login"),
    check("password").exists(),
    function (req, res, next) {
        validateSchema(req, res, next)
    }
]