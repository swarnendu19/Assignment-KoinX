# Koinx Backend Intern Assignment : Crypto Transactions and Ethereum Price API

This project is given by KoinX Backend Intern assignment and It is a Node.js application that provides APIs for fetching Ethereum transactions of a user, fetching Ethereum prices periodically, and calculating a user's total expenses. The data is fetched from external APIs like Etherscan and CoinGecko, and stored in a MongoDB database.

## Public Api on AWS 
```
http://ec2-16-171-162-206.eu-north-1.compute.amazonaws.com:5000/
```
or 
```
http://16.171.162.206:5000/
```
(If these links are not working, it means I have stopped the EC2 AWS instance due to billing issues.)
Please contact me for that on my [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/swarnendu19)

### Test Api
```
Task 1 API = http://ec2-16-171-162-206.eu-north-1.compute.amazonaws.com:5000/api/v1/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d
Task 2 API = http://ec2-16-171-162-206.eu-north-1.compute.amazonaws.com:5000/api/v1/price
Task 3 API = http://ec2-16-171-162-206.eu-north-1.compute.amazonaws.com:5000/api/v1/user-expenses/0xce94e5621a5f7068253c42558c147480f38b5e0d

```


## Table of Contents

- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Tasks](#tasks)
  - [Task 1: Fetch Crypto Transactions](#task-1-fetch-crypto-transactions)
  - [Task 2: Fetch Ethereum Price Periodically](#task-2-fetch-ethereum-price-periodically)
  - [Task 3: Calculate User Expenses](#task-3-calculate-user-expenses)

 
## Tech Stack

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)
- An API key from [Etherscan](https://etherscan.io/) to access their API
### Optional Task added 
- [Docker](https://www.docker.com/) for containerization
- [Redis](https://redis.io/) for caching to significantly improve API performance, making it up to 90% faster.
- [AWS](https://aws.amazon.com/) for deployment


## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/Assignment-Koinx.git
    cd Assignment-Koinx
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    MONGODB_URL = mongodb+srv://swarnendu19:Swarnendu2003@assignment-koinx.yerb5.mongodb.net/?retryWrites=true&w=majority&appName=Assignment-Koinx
    ETHERSCAN_API_KEY = your api key
    PORT = 5000
    COINGECKO_API = https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr
    REDIS_URI =redis://localhost:6379

    ```
 
4. **Start the server:**

    ```bash
    npm start
    ```

   The server will start running on `http://localhost:5000`.

## Setup using Docker 

  Pull the docker Image:
  ```
  docker pull swarnendu19/koinx
  ```
  Run the Image 
  ```
  docker run -d -p 5000:5000 swarnendu19/koinx
  ```


## Tasks

# Task 1: Fetch Crypto Transactions

Develop an API to fetch the list of Ethereum transactions for a user based on their address.

- **Endpoint:** `GET api/v1/transactions/:address`
- **Parameters:**
  - `address` (string): The Ethereum address of the user.
- **Response:**
  - A list of transactions associated with the provided Ethereum address.

#### Example Request

```http
GET /api/v1/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d


{
  "transactions": [
    {
      "blockNumber": "15150219",
      "timeStamp": "1657927758",
      "hash": "0x0eea7b13f28d33e4cb7f9d38cdb0c69b86bb39945f71aad42414ed770d823598",
      "from": "0x9b7bc703e2c08792ed5f2709f4091d8463772798",
      "to": "0xce94e5621a5f7068253c42558c147480f38b5e0d",
      "value": "63469846061180992",
      "gas": "21000",
      "gasPrice": "16723823264",
      "gasUsed": "21000",
      "isError": "0"
    }
    // More transactions...
  ]
}
```

# Task 2: Fetch Ethereum Price Periodically

## Overview

This task involves building a system to periodically fetch the current price of Ethereum in INR and store it in a MongoDB database. The price data is fetched using the CoinGecko API every 10 minutes.

## API Endpoint

**Endpoint:** `GET api/v1/price`

## Implementation

### 1. Fetch Ethereum Price

To fetch the current price of Ethereum in INR, we use the [CoinGecko API](https://coingecko.com). The API endpoint to get the price is:
```
GET https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr

```

### 2. Scheduled Job

A cron job is used to schedule the periodic fetching of the Ethereum price. The cron job is configured to run every 10 minutes.

### 3. Save Price Data to MongoDB

The fetched price data is stored in a MongoDB database. The database model for storing price information includes fields for currency and price.

## Implementation Details

### Setup

1. **Install Required Packages**

   Ensure you have the necessary packages installed:

   ```bash
   npm install node-cron axios mongoose
   ```
# Task 3: Calculate User Expenses

## Overview

Develop an API to calculate a user's total expenses based on their Ethereum transactions and the current price of Ether. The API endpoint retrieves the total expenses for a given Ethereum address.

## API Endpoint

**Endpoint:** `GET api/v1/user-expenses/:address`

**Parameters:**
- `address` (string): The Ethereum address of the user whose expenses you want to calculate.

**Response:**
- `totalExpenses` (number): Total expenses in Ether based on transaction data and the current price of Ether.
- `currentEtherPrice` (number): Latest price of Ethereum in INR.

## Calculation Formula

The expense for each transaction is calculated using the following formula:

```
Expense = (gasUsed × gasPrice) / 1e18

```

Where:
- `gasUsed`: The amount of gas used in the transaction.
- `gasPrice`: The price of gas in Wei.
- `1e18`: A constant to convert from Wei to Ether.
 
## Connect with me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/swarnendu19)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/swarnendu_dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/swarnendu19)
[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](dev.swarnendu.maity@gmail.com)

