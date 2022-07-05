import dayjs from "dayjs"
import { db } from "../dbConfig/mongo.js"

export async function getTransactions(req, res) {

    const userId = res.locals.userId

    try {
        const { transactions } = await db.collection("users").findOne({ _id: userId })

        res.status(200).send(transactions)
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}

export async function postInflow(req, res) {


    const id = res.locals.userId
    const { value, description } = res.locals.transaction
    const { transactions } = await db.collection("users").findOne({ _id: id })
    const reqTime = dayjs().locale('pt-br').format("DD/MM")
    const absoluteValue = Math.abs(value)

    try {
        await db.collection("users").updateOne({ _id: id },
            {
                $set: {
                    transactions: [
                        ...transactions, {
                            value: +absoluteValue,
                            description,
                            type: "inflow",
                            date: reqTime
                        }]
                }
            })

        res.status(200).send("Success")
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}

export async function postOutflow(req, res) {

    const id = res.locals.userId
    const { value, description } = res.locals.transaction
    const { transactions } = await db.collection("users").findOne({ _id: id })
    const reqTime = dayjs().locale('pt-br').format("DD/MM")
    const absoluteValue = Math.abs(value)

    try {
        await db.collection("users").updateOne({ _id: id },
            {
                $set: {
                    transactions: [
                        ...transactions, {
                            value: -absoluteValue,
                            description,
                            type: "outflow",
                            date: reqTime
                        }]
                }
            })

        res.status(200).send("Success")
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}
