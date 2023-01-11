import { body, oneOf } from "express-validator";

import validateSchema from "../middleware/validateSchema.js";
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
  body("userId")
  .exists()
  .isMongoId()
  .custom(async(val) => {
    return await User.exists({_id: val})
  }),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
]