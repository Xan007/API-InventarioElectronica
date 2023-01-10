import { Router } from "express";
import { authenticate, checkRole } from "../middleware/auth.js";

import { validateComponent } from "../validators/components.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Endpoint users");
});

//Añade un componente
router.post("/addComponent", authenticate, validateComponent, (req, res) => {});

export default { router: router, endpoint: "/users" };
