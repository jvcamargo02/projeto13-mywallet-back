import joi from "joi"
import { hashSync } from "bcrypt"
import { db } from "../dbConfig/mongo.js"

export async function validateSignUp(req, res, next) {

    const { name, email, password } = req.body
    const user = await db.collection("users").findOne({ email })

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const { error } = signUpSchema.validate(req.body)

    if (error) {
        return res.status(406).send(error.details[0].message)
    }

    if (user) {
        return res.status(401).send("This e-email already exists")
    }

    const passwordCrypt = hashSync(password, 10)

    delete req.body.password

    res.locals.user = { name, email, passwordCrypt }
    
    next()
}