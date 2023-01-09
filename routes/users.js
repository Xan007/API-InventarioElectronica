import { Router } from "express";
import { authenticate } from "../middleware/auth.js";

import { validateCreation as validateComponent } from "../validators/components.js"

const router = Router()

router.get("/", (req, res) => {
    res.send("Endpoint users")
})

//Añade un componente
router.post("/component", authenticate, validateComponent, (req, res) => {
    
})

export default {router: router, endpoint: "/users"}