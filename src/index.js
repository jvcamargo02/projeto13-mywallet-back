import express from "express"
import cors from "cors"
import { config } from "dotenv"
import authRoute from "./routes/authRoute.js"
import transactionsRoute from "./routes/transactionsRoute.js"

config()

const app = express()

app.use(cors())
app.use(express.json())

app.use(authRoute)
app.use(transactionsRoute)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`ONLINE AT PORT ${PORT}`)
})