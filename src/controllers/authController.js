import {db} from "../dbConfig/mongo.js"

export async function loginUser(req, res) {
    
    const { user } = req.body
    


    return("Oi")
}

export async function signUp(req,res){
   
    const { name, email, passwordCrypt }  = res.locals.user


    try {
        await db.collection("users").insertOne({
            name,
            email,
            passwordCrypt
        })

        res.status(201).send("Created user")
    } catch {
        res.status(500).send("An error occurred. Please try again later.")
    }
}