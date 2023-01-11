import { body } from "express-validator";

import { validateSchema } from "../helpers/validatorHelper.js"

import Component from "../models/Component.js";

export const validateComponent = [
  body("name").notEmpty().exists(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];

export const validateUpdateOrAdd = [
  body("componentId")
    .exists()
    .isMongoId()
    .custom(async (val) => {
      return await Component.exists({ _id: val });
    }),
  body("amount").exists().isInt(),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];

export const checkComponentId = [
  body("componentId")
    .exists()
    .isMongoId()
    .custom(async (val) => {
      return await Component.exists({ _id: val });
    }),
  function (req, res, next) {
    validateSchema(req, res, next);
  },
];
