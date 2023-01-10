import { Router } from "express";
import { authProject, validateProject } from "../validators/projects.js";
import { checkRole, userHasRole } from "../middleware/auth.js";

import Project from "../models/Project.js";
import User from "../models/User.js";
import { isValidObjectId } from "mongoose";

const router = Router();

const checkUserId = async (req, res, next) => {
  const { userId } = req.body;

  if (!userId)
    return res.status(400).send("Couldn't find userId in request's body");

  if (!isValidObjectId(userId))
    return res.status(400).send(`userId: ${userId} is not valid`);

  if (!(await User.exists({ _id: userId })))
    return res.status(404).send(`Couldn't find a user with id: ${userId}`);

  return next();
};

const checkAccess = async (project, user) => {
  if (!project.isAdmin(user._id) || !userHasRole(user, "admin"))
    return "Unathorized";
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

//Añadir usuario
router.post(
  "/:projectId/addUser",
  checkRole("user", "admin"),
  authProject,
  checkUserId,
  async (req, res) => {
    if (checkAccess(req.project, req.user) == "Unathorized")
      return res.status(401).send("Unathorized");

    req.project.addUser(req.body.userId);
    await req.project.save();
  }
);

//Eliminar un usuario
router.post(
  "/:projectId/removeUser",
  checkRole("user", "admin"),
  authProject,
  checkUserId,
  async (req, res) => {
    if (checkAccess(req.project, req.user) == "Unathorized")
      return res.status(401).send("Unathorized");

    req.project.removeUser(req.body.userId);
    await req.project.save();
  }
);

router.post(
  "/:projectId/addAdmin",
  checkRole("user", "admin"),
  authProject,
  checkUserId,
  async (req, res) => {
    if (checkAccess(req.project, req.user) == "Unathorized")
      return res.status(401).send("Unathorized");

    req.project.addAdmin(req.body.userId);
    await req.project.save();
  }
);

router.post(
  "/:projectId/removeAdmin",
  checkRole("user", "admin"),
  authProject,
  checkUserId,
  async (req, res) => {
    if (checkAccess(req.project, req.user) == "Unathorized")
      return res.status(401).send("Unathorized");

    req.project.removeAdmin(req.body.userId);
    await req.project.save();
  }
);

export default { router: router, endpoint: "/projects" };
