import { Router } from "express";
import { getTransactions, postInflow, postOutflow } from "../controllers/transactionsController.js"
import { findUserInDb } from "../middlewares/findUserInDb.js";
import { validInputValueDescription } from "../middlewares/validInputValueDescription.js";

const router = Router()

router.get("/home", findUserInDb, getTransactions)
router.post("/cash-inflow", findUserInDb, validInputValueDescription, postInflow)
router.post("/cash-outflow", findUserInDb, validInputValueDescription, postOutflow)

export default router