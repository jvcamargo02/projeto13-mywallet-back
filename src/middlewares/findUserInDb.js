import { db } from "../dbConfig/mongo.js"

export async function findUserInDb(req, res, next) {

    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    const user = await db.collection("sessions").findOne({ token })

    console.log(user)

    if (user === null ) {
        return res.status(498).send("Token expired or invalid. You have to reconnect to the site")
    }

    res.locals.userId = user.id

    next()
}