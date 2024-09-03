import corn from 'node-cron'
import { fetchEtherPrice } from '../services/price.services.js';
import { Price } from '../models/price.model.js';
import { redis, redisTTL } from '../app.js';

export const scheduleEthereumPriceJob=()=>{
    corn.schedule('*/10 * * * *', async()=>{
        console.log("Fething the Price of Ethereum....");
        try {
            const etherPrice = await fetchEtherPrice();
            const newEtherPrice = new Price({currency: 'INR', price: etherPrice})
            await newEtherPrice.save();
           // Update the cache with the new price
            await redis.set('currentEthPrice', JSON.stringify(etherPrice), 'EX', redisTTL);
            console.log(`New Ethereum Price is : ₹${etherPrice}`);
        } catch (error) {
            console.error('Error saving Ethereum price:', error);
        }
    })
}