import { body, oneOf } from "express-validator";

import validateSchema from "../middleware/validateSchema.js";

export const validateRegister = [
  body("name").exists(),
  body("email").exists().isEmail(),
  body("password").exists(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];

export const validateLogin = [
  oneOf(
    [body("name").exists(), body("email").isEmail()],
    "Email or name is required to login"
  ),
  body("password").exists(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];
