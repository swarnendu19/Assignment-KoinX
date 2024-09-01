import corn from 'node-cron'
import { fetchEtherPrice } from '../services/price.services';
import { Price } from '../models/price.model';

export const scheduleEthereumPriceJob=()=>{
    corn.schedule('*/1 * * * *', async()=>{
        console.log("Fething the Price of Ethereum....");
        try {
            const etherPrice = await fetchEtherPrice();
            const newEtherPrice = new Price({currency: 'INR', price: etherPrice})
            await newEtherPrice.save();
            console.log(`New Ethereum Price is : ₹${etherPrice}`);
        } catch (error) {
            console.error('Error saving Ethereum price:', error);
        }
    })
}