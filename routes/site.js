import { Router } from "express";

import { validateRegister, validateLogin } from "../validators/users.js"
import User from "../models/User.js"


const router = Router()

router.get("/", (req, res) => {
    res.send("Bienvenido a InventarioElectronica")
})

router.post("/login", validateLogin, async(req, res) => {

})

router.post("/register", validateRegister, async(req, res) => {
    const { name, email, password } = req.body

    const createdUser = new User({
        name: name,
        email: email,
        password: password
    })
    await createdUser.encryptPassword()
    await createdUser.save()
})

export default {router: router, endpoint: "/"}