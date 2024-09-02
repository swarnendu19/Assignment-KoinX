import { asyncHandler } from "../utils/asyncHandler.js";
import { Price } from "../models/price.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { redis, redisTTL } from "../app.js";

export const getCurrentEthPrice = asyncHandler(
    async (req, res) => {
        try {
            //Cache Price
            const cachedPrice = await redis.get('currentEthPrice');
            if(cachedPrice){
                const parsedPrice = JSON.parse(cachedPrice);
                return res.status(201).json(
                    new ApiResponse(200, {price: parsedPrice}, `Current Ethereum price(cached) is : ₹${cachedPrice}`)
                )
            }

            const currentPrice = await Price.findOne().sort({ createdAt: -1 });
            if (!currentPrice) {
                throw new ApiError(404, "Price data not found in Database");
            }

            // await redis.set('currentEthPrice', JSON.stringify(currentPrice.price), 'EX', redisTTL);

            return res.status(200).json(
                new ApiResponse(200, { price: currentPrice.price }, `Current Ethereum price is : ₹${currentPrice.price}`)
            );
        } catch (error) {
            if (error instanceof ApiError) {
                return res.status(error.statusCode).json({ error: error.message });
            }
            return res.status(500).json({ error: 'Some unexpected error occured' });
        }
        
    }
);


