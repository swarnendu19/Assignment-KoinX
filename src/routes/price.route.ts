import { Router } from "express";
import { getCurrentEthPrice } from "../controller/price";

const router = Router();

//Main Route - api/v1/price
router.route('/price').get(getCurrentEthPrice);

export default router;