import { Router } from "express"
import { loginUser, signUp } from "../controllers/authController.js"
import {validateSignUp } from "../middlewares/validateSignUp.js"

const router = Router()

router.post("/", loginUser)
router.post("/sign-up", validateSignUp, signUp)

export default router