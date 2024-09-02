import { redis, redisTTL } from "../app.js";
import { Price } from "../models/price.model.js";
import { Transaction } from "../models/transaction.mode.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


export const getUserExpenses = asyncHandler(
    async(req, res)=>{
        try {
            const {address} = req.params;


            const cacheExpenses = await redis.get(`expenses_${address}`)
            if(cacheExpenses){
                const parsedExpenses = JSON.parse(cacheExpenses);
                // console.log(parsedExpenses);
                return res.status(201).json(
                    new ApiResponse(200, parsedExpenses, `Total Expenses (cached): ${parsedExpenses.totalExpenses}`)
                );
            }
            const transactionRecord = await Transaction.findOne({address});
            // console.log(transactionRecord);   
            if(!transactionRecord) {
                throw new ApiError(404, "Transaction not found");
            }
            // console.log(transactionRecord.transactions);
            //I am Calculating the total expensees
            let totalExpenses = 0;
            transactionRecord.transactions.forEach(t =>{
                const gasUsed = parseInt(t.gasUsed, 10);
                const gasPrice = parseInt(t.gasPrice, 10);
                // console.log(`gasUsed: ${gasUsed}, gasPrice: ${gasPrice}`);
                totalExpenses += (gasUsed * gasPrice) / 1e18;
            }) 
            const currentPriceRecord = await Price.findOne({currency: 'INR' }).sort({ createdAt: -1 });
            if(!currentPriceRecord) throw new ApiError(404, "Ethereum current not found in Database");
            // console.log(currentPriceRecord.price);    

            // Cache the total expenses and current Ether price
            await redis.set(`expenses_${address}`, JSON.stringify({
                totalExpenses,
                currentEtherPrice: currentPriceRecord.price,
              }), 'EX', redisTTL);

            return res.status(201).json(
                new ApiResponse(200 ,{
                    totalExpenses,
                    currentEtherPrice: currentPriceRecord.price,
                  },
                   `Total Expenses: ${totalExpenses}`
                )
            )
        } catch (error) {
            console.error('Error fetching user expenses:', error);
        }
    }
)

 