import { Router } from "express"
import { loginUser, signUp } from "../controllers/authController.js"
import { validateSignUp } from "../middlewares/validateSignUp.js"
import { validateUser } from "../middlewares/validateUser.js"

const router = Router()

router.post("/", validateUser, loginUser)
router.post("/sign-up", validateSignUp, signUp)

export default router