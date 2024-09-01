import axios from "axios";


export const fetchEtherPrice = async ()=>{
    const url = process.env.COINGECKO_API || "";
    try {
        const response = await axios.get(url);
        console.log(response); 
        return response.data.ethereum.inr;
    } catch (error) {
        console.error('Error fetching Ethereum price:', error);
        throw error;
    }
}  