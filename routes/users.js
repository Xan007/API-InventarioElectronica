import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
    res.send("Endpoint users")
})

router.post("/", (req, res) => {
    
})

export default {router: router, endpoint: "/users"}