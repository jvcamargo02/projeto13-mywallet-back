import { db } from "../dbConfig/mongo.js"

export async function findUserInDb(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const { id } = await db.collection("sessions").findOne({ token })

    if (!id) {
        return res.status(498).send("Token expired or invalid. You have to reconnect to the site")
    }

    res.locals.userId = { id }

    next()
}