import { Router } from "express";
import { authenticate, checkRole } from "../middleware/auth.js";

import {
  createComponent,
  deleteComponent,
  getAllComponents,
} from "../middleware/components.js";
import { validateComponent } from "../validators/components.js";

const router = Router();

router.get("/", authenticate, checkRole("user"), (req, res) => {
  res.send(getAllComponents());
});

router.post(
  "/",
  authenticate,
  checkRole("admin"),
  validateComponent,
  createComponent
);

router.delete(
  "/",
  authenticate,
  checkRole("admin"),
  validateComponent,
  deleteComponent
);

export default { router: router, endpoint: "/components" };
