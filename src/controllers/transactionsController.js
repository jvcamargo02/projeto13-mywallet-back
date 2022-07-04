import { db } from "../dbConfig/mongo.js"

export async function getTransactions(req, res) {

    const { id } = res.locals.userId

    try {
        const transactions = await db.collection("transactions").findOne({ _id: id })

        res.status(200).send(transactions)
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}