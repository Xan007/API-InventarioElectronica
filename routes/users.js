import { Router } from "express";
import { checkRole } from "../middleware/auth.js";

import User from "../models/User.js";

import {
  validateUpdateOrAdd,
  checkComponentId,
} from "../validators/components.js";

import { checkUserId } from "../validators/users.js";

import {
  getUserProjects,
  getUserProjectsWithAdmin,
} from "../controllers/projectController.js";

import {
  userHasPermissionsOn,
  getAllUsers,
  getUserById,
  getUserComponents,
} from "../controllers/userController.js";

const hasPermissions = async (req, res, next) => {
  try {
    userHasPermissionsOn(req.user, req.params.userId)
    next();
  } catch (err) {
    return res.status(400).send(`${err}`);
  }
};

const router = Router();

router.get("/", async (req, res) => {
  res.send(await getAllUsers(true));
});

router.get(
  "/:userId/projects",
  checkRole("user"),
  hasPermissions,
  checkUserId,
  async (req, res) => {
    res.send(await getUserProjects(req.user._id));
  }
);

router.get(
  "/:userId/projects/admin",
  checkRole("user"),
  hasPermissions,
  checkUserId,
  async (req, res) => {
    res.send(await getUserProjectsWithAdmin(req.user._id));
  }
);

router.get("/:userId", checkUserId, async (req, res) => {
  const { userId } = req.params;

  try {
    res.send(await getUserById(userId, true))
  } catch (err) {
    res.status(400).send(`${err}`)
  }
});

//Eliminar usuario
router.delete("/:userId", checkRole("admin"), checkUserId, async (req, res) => {
  const { userId } = req.params;

  try {
    await User.findByIdAndDelete(userId);

    res.send(`Usuario con id: ${userId} ha sido eliminado`);
  } catch (err) {
    return res.status(400).send(err);
  }
});

//Obtener todos los componentes de un usuario
router.get("/:userId", checkRole("user"), async(req, res) => {
  res.send(await getUserComponents(req.user._id))
})

//Añade un componente
router.post(
  "/:userId/addComponent",
  checkRole("user"),
  hasPermissions,
  validateUpdateOrAdd,
  async (req, res) => {
    const { componentId, amount } = req.body;

    try {
      req.user.addComponent(componentId, amount);

      await req.user.save();

      res.send(req.user.safeReturn());
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.put(
  "/:userId/updateComponent",
  checkRole("user"),
  hasPermissions,
  validateUpdateOrAdd,
  async (req, res) => {
    const { componentId, amount } = req.body;

    try {
      req.user.updateComponent(componentId, amount);

      await req.user.save();

      res.send(req.user.safeReturn());
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

router.delete(
  "/:userId/removeComponent",
  checkRole("user"),
  hasPermissions,
  checkComponentId,
  async (req, res) => {
    const { componentId } = req.body;

    try {
      req.user.removeComponent(componentId);
      await req.user.save();

      res.send(req.user.safeReturn());
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

export default { router: router, endpoint: "/users" };
