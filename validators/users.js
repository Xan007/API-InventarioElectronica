import { body, check, oneOf } from "express-validator";
import { validateSchema } from "../helpers/validatorHelper.js"

import User from "../models/User.js";

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

export const checkUserId = [
  check("userId", "UserId is required")
  .exists()
  .isMongoId()
  .custom(async(val) => {
    return await User.exists({_id: val})
  })
  .withMessage("User doesn't exist"),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
]