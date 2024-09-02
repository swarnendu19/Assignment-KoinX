import { redis, redisTTL } from "../app.js";
import { Transaction } from "../models/transaction.mode.js";
import fetchCryptoTransaction from "../services/transactions.services.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//Task 1 of KoinX
export const allTransaction  = asyncHandler(
    async(req, res) =>{
        const {address }= req.params;

        //Cached the transaction 
        const chachedTransactions = await redis.get(address);
        if(chachedTransactions){
            return res.status(201).json(
                new ApiResponse(200, JSON.parse(chachedTransactions) ,"All Transaction fetched Successfully(chached)")
            )
        }

        const transactions = await fetchCryptoTransaction(address);
        if(!transactions){
              throw new ApiError(500, "An error occurred while fetching transactions")
        }

        //cache the transaction data

        await redis.set(address, JSON.stringify(transactions), 'EX' , redisTTL)

        //Saved to mongoDB database
        const newTransaction = new Transaction({address, transactions});
        await newTransaction.save();
        return res.status(201).json(
            new ApiResponse(200 ,transactions, "All Transaction fetched Successfully")
        )
    }
)