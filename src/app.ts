import express  from 'express'
import { scheduleEthereumPriceJob } from './jobs/priceScheduler';

const app = express();

//Testing the api
app.get("/", (req, res) => { 
    res.send("API is working with api/v1");  
});

// Schedule the Ethereum price job to run every 10 minutes
scheduleEthereumPriceJob()

//Task 1 assignment of KoinX
import transactionRouter from "./routes/transactions.route"
//Task 2 : Fetching Ethereum Price in every 10 min
import priceRouter from "./routes/price.route"

app.use("/api/v1", transactionRouter);
app.use("/api/v1", priceRouter);


export {app};