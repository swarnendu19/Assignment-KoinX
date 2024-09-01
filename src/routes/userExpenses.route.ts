import { Router } from "express";
import { getUserExpenses } from "../controller/userExpenses.js";

const router = Router();

//Main Route - api/v1/user-expenses/:address
router.route('/user-expenses/:address').get(getUserExpenses);

export default router;