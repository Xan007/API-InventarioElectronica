import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
    res.send("Bienvenido a InventarioElectronica")
})

router.post("/login", (req, res) => {

})

router.post("/register", (req, res) => {

})

export default {router: router, endpoint: "/"}