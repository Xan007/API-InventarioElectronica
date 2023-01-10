import { body, param } from "express-validator";
import Project from "../models/Project.js";

import validateSchema from "../middleware/validateSchema.js";

export const validateProject = [
  body("title").exists().notEmpty(),
  body("about").optional(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];

export const authProject = [
  param("projectId").exists().isMongoId(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
  async function (req, res, next) {
    const projectWithID = await Project.findById(req.params.projectId);

    if (!projectWithID)
      return res
        .status(400)
        .send(`No project with ID: ${req.params.projectId}`);

    req.project = new Project(projectWithID);
    return next();
  },
];
