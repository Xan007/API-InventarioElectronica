import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import routes from "./routes/index.js"
dotenv.config()

import "./passportJWT.js"
import "./db.js"

const app = express()
app.use(morgan("dev"))

app.use(express.json())
app.use("/", routes)

app.listen(process.env.PORT, () => {
    console.log(`Escuchando en el puerto ${process.env.PORT}`)
})