import { Router } from "express";
import { allTransaction } from "../controller/transaction";

const router = Router();

//Main Route - api/v1/transactions/:address
router.route('/transactions/:address').get(allTransaction);

export default router;