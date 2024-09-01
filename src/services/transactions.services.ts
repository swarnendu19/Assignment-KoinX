import axios from "axios";

const fetchCryptoTransaction = async (address : string)=>{
   const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY }`;
    try {
    const response = await axios.get(apiUrl);
   //  console.log(response);
    return response.data.result;  

   } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
   }
}

export default fetchCryptoTransaction;