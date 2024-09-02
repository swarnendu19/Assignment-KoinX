import express  from 'express'
import { scheduleEthereumPriceJob } from './jobs/priceScheduler.js';
import { connectRedis } from './utils/redis.js';


const app = express();


const redisURI = process.env.REDIS_URI || "";
export const redisTTL = process.env.REDIS_TTL || 60 * 60 * 4;
export const redis = connectRedis(redisURI);


//Testing the api
app.get("/", (req, res) => { 
    res.send("API is working with api/v1");  
});

// Schedule the Ethereum price job to run every 10 minutes
scheduleEthereumPriceJob()

import transactionRouter from "./routes/transactions.route.js"
import priceRouter from "./routes/price.route.js"
import expensesRoute from "./routes/userExpenses.route.js"

//Task 1 assignment of KoinX
app.use("/api/v1", transactionRouter);
//Task 2 : Fetching Ethereum Price in every 10 min
app.use("/api/v1", priceRouter);
//Task 3: Calculating the user Expenses
app.use("/api/v1", expensesRoute)


export default app;