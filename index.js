import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
dotenv.config()

const app = express()

app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Holaa")
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
})