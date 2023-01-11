import { Router } from "express";
import { authenticate, checkRole, userHasRole } from "../middleware/auth.js";

import Project from "../models/Project.js";
import User from "../models/User.js";
import Component from "../models/Component.js";

import { authProject, validateProject } from "../validators/projects.js";
import { validateUpdateOrAdd, checkComponentId } from "../validators/components.js"
import { checkUserId } from "../validators/users.js"

const router = Router();

const checkAccess = async (req, res, next) => {
  if (!req.project.isAdmin(req.user._id) || !userHasRole(req.user, "admin"))
    return res.status(401).send("Unathorized");

  return next();
};

//Crea un proyecto
//Titulo, descripcion
router.post("/", checkRole("user"), validateProject, async (req, res) => {
  const { title, about } = req.body;

  const createdProject = new Project({ title: title, about: about || "About" });
  createdProject.addAdmin(req.user._id);

  try {
    await createdProject.save();
    return res.send(createdProject);
  } catch (err) {
    return res.status(400).send(`Sucedio un error: ${err}`);
  }
});

router.post(
  "/:projectId/addComponent",
  authenticate,
  authProject,
  checkAccess,
  validateUpdateOrAdd,
  async (req, res) => {
    req.project.addUser(req.body.componentId, req.body.amount);
    await req.project.save();
  }
);

router.post(
  "/:projectId/removeComponent",
  authenticate,
  authProject,
  checkAccess,
  checkComponentId,
  async (req, res) => {
    req.project.removeComponent(req.body.componentId);
    await req.project.save();
  }
);

router.post(
  "/:projectId/updateComponent",
  authenticate,
  authProject,
  checkAccess,
  validateUpdateOrAdd,
  async (req, res) => {
    req.project.updateComponent(req.body.componentId, req.body.amount);
    await req.project.save();
  }
);

//Añadir usuario
router.post(
  "/:projectId/addUser",
  authenticate,
  authProject,
  checkAccess,
  checkUserId,
  async (req, res) => {
    req.project.addUser(req.body.userId);
    await req.project.save();
  }
);

//Eliminar un usuario
router.post(
  "/:projectId/removeUser",
  authenticate,
  authProject,
  checkAccess,
  checkUserId,

  async (req, res) => {
    req.project.removeUser(req.body.userId);
    await req.project.save();
  }
);

router.post(
  "/:projectId/addAdmin",
  authenticate,
  authProject,
  checkAccess,
  checkUserId,
  async (req, res) => {
    req.project.addAdmin(req.body.userId);
    await req.project.save();
  }
);

router.post(
  "/:projectId/removeAdmin",
  authenticate,
  authProject,
  checkAccess,
  checkUserId,
  async (req, res) => {
    req.project.removeAdmin(req.body.userId);
    await req.project.save();
  }
);

export default { router: router, endpoint: "/projects" };
