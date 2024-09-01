import { asyncHandler } from "../utils/asyncHandler";
import { Price } from "../models/price.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

export const getCurrentEthPrice = asyncHandler(
    async (req, res) => {
        try {
            const latestPrice = await Price.findOne().sort({ createdAt: -1 });
            if (!latestPrice) {
                throw new ApiError(404, "Price data not found in Database");
            }
            return res.status(200).json(
                new ApiResponse(200, { price: latestPrice.price }, `Current Ethereum price is : ₹${latestPrice.price}`)
            );
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Some unexpected error occured' });
        }
        
    }
);


