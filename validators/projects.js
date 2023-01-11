import { body, param } from "express-validator";
import Project from "../models/Project.js";

import { validateSchema } from "../helpers/validatorHelper.js"

export const validateProject = [
  body("title").exists().notEmpty(),
  body("about").optional(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];

export const checkProjectId = [
  param("projectId").exists().isMongoId(),
  function (req, res, next) {
    validateSchema(req, res, next);
  }
]