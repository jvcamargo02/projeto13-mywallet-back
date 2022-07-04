import joi from "joi"
import { hashSync } from "bcrypt"

export function validateSignUp(req, res, next) {

    const { name, email, password } = req.body

    const signUpSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    })

    const { error } = signUpSchema.validate(req.body)

    if (error) {
        return res.status(406).send(error.details[0].message)
    }

    const passwordCrypt = hashSync(password, 10)

    delete req.body.password

    res.locals.user = { name, email, passwordCrypt }
    
    next()
}