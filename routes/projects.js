import { Router } from "express";
import { authenticate, checkRole, userHasRole } from "../middleware/auth.js";

import Project from "../models/Project.js";

import { checkProjectId, validateProject } from "../validators/projects.js";
import {
  validateUpdateOrAdd,
  checkComponentId,
} from "../validators/components.js";
import { checkUserId } from "../validators/users.js";

import { findProjectById, getAllProjects, userHasPermissions } from "../controllers/projectController.js"

const router = Router();

const accessMiddleware = async(req, res, next) => {
  try {
    userHasPermissions(req.user, req.project._id)
    next()
  } catch (err) {
    return res.status(401).send(`${err}`)
  }
}

const projectToReq = async(req, res, next) => {
  try {
    req.project = await findProjectById(req.params.projectId)
  } catch (err) {
    return res.status(400).send(`${err}`)
  }
}

const middlewareProject = [authenticate, checkProjectId, projectToReq, accessMiddleware];

//Obtener todos los proyectos
router.get("/", checkRole("admin"), async(req, res) => {
  res.send(await getAllProjects())
})

//Obtener un proyecto
router.get("/:projectId", checkRole("user"), async(req, res) => {
  try {
    const project = await findProjectById(req.params.projectId)
    return res.send(project)
  } catch (err) {
    res.status(400).send(`${err}`)
  }
})

//Crea un proyecto
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

//Actualizar un proyecto
router.put(
  "/:projectId",
  middlewareProject,
  validateProject,
  async (req, res) => {
    const { title = req.project.title, about = req.project.about } = req.body;

    req.project.title = title;
    req.project.about = about;

    try {
      await req.project.save();
      return res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

//Eliminar un proyecto
router.delete("/:projectId", middlewareProject, async (req, res) => {
  const { projectId } = req.params;

  try {
    await Project.findByIdAndDelete(projectId);

    res.send(`Eliminado proyecto con id: ${projectId}`);
  } catch (err) {
    res.status(400).send(`${err}`);
  }
});

//Añadir componente
router.post(
  "/:projectId/addComponent",
  middlewareProject,
  validateUpdateOrAdd,
  async (req, res) => {
    try {
      req.project.addUser(req.body.componentId, req.body.amount);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

//Quitar componente
router.delete(
  "/:projectId/removeComponent",
  middlewareProject,
  checkComponentId,
  async (req, res) => {
    try {
      req.project.removeComponent(req.body.componentId);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

//Actualizar componente
router.post(
  "/:projectId/updateComponent",
  middlewareProject,
  validateUpdateOrAdd,
  async (req, res) => {
    try {
      req.project.updateComponent(req.body.componentId, req.body.amount);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

//Añadir usuario
router.post(
  "/:projectId/addUser",
  middlewareProject,
  checkUserId,
  async (req, res) => {
    try {
      req.project.addUser(req.body.userId);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

//Eliminar un usuario
router.delete(
  "/:projectId/removeUser",
  middlewareProject,
  checkUserId,

  async (req, res) => {
    try {
      req.project.removeUser(req.body.userId);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

router.post(
  "/:projectId/addAdmin",
  middlewareProject,
  checkUserId,
  async (req, res) => {
    try {
      req.project.addAdmin(req.body.userId);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

router.delete(
  "/:projectId/removeAdmin",
  middlewareProject,
  checkUserId,
  async (req, res) => {
    try {
      req.project.removeAdmin(req.body.userId);
      await req.project.save();

      res.send(req.project);
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  }
);

export default { router: router, endpoint: "/projects" };
