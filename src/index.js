import express from "express"
import cors from "cors"
import { config } from "dotenv"
import authRouter from "./routes/authRouter.js"

config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`ONLINE AT PORT ${PORT}`)
})