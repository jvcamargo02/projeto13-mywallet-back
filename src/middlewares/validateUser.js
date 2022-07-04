import joi from "joi"
import { compareSync } from "bcrypt"
import { db } from "../dbConfig/mongo.js"


export async function validateUser(req, res, next) {

    const { email, password } = req.body

    const userSchema = joi.object({
        email: joi.string().required(),
        password: joi.string().required()
    })

    const { error } = userSchema.validate(req.body)

    if (error) {
       return res.status(401).send(error.details[0].message)
    }

    const user = await db.collection("users").findOne({ email })

    if (!user || !(compareSync(password, user.passwordCrypt))) {
       return res.status(401).send("Invalid e-mail or password")
    }

    delete req.body.password

    res.locals.user = user

    next()
}