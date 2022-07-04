import { db } from "../dbConfig/mongo.js"

export async function getTransactions(req, res) {

    const id = res.locals.userId
    console.log(id)

    try {
        const dataUser = await db.collection("users").findOne({ _id: id})

        res.status(200).send(dataUser)
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}

export async function postInflow(req, res) {


    const  id  = res.locals.userId
    const { value, description } = res.locals.transaction
    const { transactions } = await db.collection("users").findOne({ _id: id })

    try {
        await db.collection("users").updateOne({ _id: id },
            {
                $set: {
                    transactions: [{
                        ...transactions,   
                    }, {
                        value,
                        description,
                        type: "inflow"
                    }]
                }
            })
        
        res.status(200).send("Success")
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}

export async function postOutflow(req, res) {

    const id  = res.locals.userId
    const { value, description } = res.locals.transaction
    const { transactions } = await db.collection("users").findOne({ _id: id })

    try {
        await db.collection("users").updateOne({ _id: id },
            {
                $set: {
                    transactions: [{
                        ...transactions,   
                    }, {
                        value,
                        description,
                        type: "inflow"
                    }]
                }
            })
        
        res.status(200).send("Success")
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}
