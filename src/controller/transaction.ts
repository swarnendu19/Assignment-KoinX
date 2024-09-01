import { Transaction } from "../models/transaction.mode.js";
import fetchCryptoTransaction from "../services/transactions.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Task 1 of KoinX
export const allTransaction  = asyncHandler(
    async(req, res) =>{
        const {address }= req.params;
        const transactions = await fetchCryptoTransaction(address);
        if(!transactions){
              throw new ApiError(500, "An error occurred while fetching transactions")
        }
        const newTransaction = new Transaction({address, transactions});
        await newTransaction.save();
        return res.status(201).json(
            new ApiResponse(200 ,transactions, "All Transaction")
        )
    }
)