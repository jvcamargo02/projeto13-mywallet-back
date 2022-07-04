import joi from "joi"

export async function validInputValueDescription(req, res, next) {

    const { value, description } = req.body

    const inputSchema = joi.object({
        value: joi.string().required(),
        description: joi.string().required()
    })

    const { error } = inputSchema.validate(req.body)

    if (error) {
        return res.status(406).send(error.details[0].message)
    }

    res.locals.transaction = { value, description }

    next()
}