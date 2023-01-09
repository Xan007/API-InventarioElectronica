import { Router } from "express";

const router = Router()

router.get("/", (req, res) => {
    res.send("Endpoint projects")
})


router.post("/", (req, res) => {

})

export default {router: router, endpoint: "/projects"}