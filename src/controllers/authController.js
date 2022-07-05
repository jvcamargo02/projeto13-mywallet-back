import { db } from "../dbConfig/mongo.js"
import {v4 as uuid} from "uuid"

export async function loginUser(req, res) {

    const { name, _id } = res.locals.user
    const userSession = await db.collection("sessions").findOne({
        id: _id
    })
    const token = uuid()

    if (userSession) {
        await db.collection("sessions").deleteOne({
            id: _id
        })
    }


    try {
         await db.collection("sessions").insertOne({
            id: _id,
            token
        }) 

        const bodyResponse = {
            token,
            name
        }

        res.status(200).send(bodyResponse)
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}

export async function signUp(req, res) {

    const { name, email, passwordCrypt } = res.locals.user


    try {
        await db.collection("users").insertOne({
            name,
            email,
            passwordCrypt,
            transactions: []
        })

        res.status(201).send("Created user")
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}