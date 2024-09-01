import { Price } from "../models/price.model";
import { Transaction } from "../models/transaction.mode";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";


export const getUserExpenses = asyncHandler(
    async(req, res)=>{
        try {
            const {address} = req.params;
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

 