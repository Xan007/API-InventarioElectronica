import { Router } from "express";
import { authenticate, checkRole } from "../middleware/auth.js";

import {
  createComponent,
  deleteComponent,
  getAllComponents,
} from "../controllers/componentController.js"
import { validateComponent } from "../validators/components.js";

const router = Router();

router.get("/", checkRole("admin"), async(req, res) => {
  res.send(await getAllComponents());
});

//Crea componente
router.post(
  "/",
  checkRole("admin"),
  validateComponent,
  async(req, res) => {
    try {
      res.send(await createComponent(req.body))
    } catch(err) {
      res.status(400).send(err)
    }
  }
);

//Elimina componente
router.delete(
  "/",
  checkRole("admin"),
  validateComponent,
  async(req, res) => {
    try {
      res.send(await deleteComponent(req.body))
    } catch(err) {
      res.status(400).send(err)
    }
  }
);

export default { router: router, endpoint: "/components" };
