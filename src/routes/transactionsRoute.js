import { Router } from "express";
import {getTransactions} from "../controllers/transactionsController.js"
import { findUserInDb } from "../middlewares/findUserInDb.js";

const router = Router()

router.get("/home", findUserInDb, getTransactions)

export default router