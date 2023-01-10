import { body } from "express-validator";

import validateSchema from "../middleware/validateSchema.js";

export const validateComponent = [
  body("name").notEmpty().exists(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];
