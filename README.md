# Crypto Transactions and Ethereum Price API

This project is a Node.js application that provides APIs for fetching Ethereum transactions of a user, fetching Ethereum prices periodically, and calculating a user's total expenses. The data is fetched from external APIs like Etherscan and CoinGecko, and stored in a MongoDB database.

## Table of Contents

- [Project Description](#project-description)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Tasks](#tasks)
  - [Task 1: Fetch Crypto Transactions](#task-1-fetch-crypto-transactions)
  - [Task 2: Fetch Ethereum Price Periodically](#task-2-fetch-ethereum-price-periodically)
  - [Task 3: Calculate User Expenses](#task-3-calculate-user-expenses)
- [Contributing](#contributing)
- [License](#license)

## Project Description

The Crypto Transactions and Ethereum Price API provides several endpoints for interacting with the Ethereum blockchain. It allows users to fetch their transaction history, get real-time Ethereum prices, and calculate total expenses based on their transaction data.

## Prerequisites

To run this project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/) (local or cloud-based)
- An API key from [Etherscan](https://etherscan.io/) to access their API

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/crypto-api.git
    cd crypto-api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Environment Variables:**

   Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    ETHERSCAN_API_KEY=your_etherscan_api_key
    MONGODB_URI=your_mongodb_uri
    ```

   - Replace `your_etherscan_api_key` with the API key obtained from Etherscan.
   - Replace `your_mongodb_uri` with your MongoDB connection string.

4. **Start the server:**

    ```bash
    npm start
    ```

   The server will start running on `http://localhost:3000`.

## Tasks

### Task 1: Fetch Crypto Transactions

Develop an API to fetch the list of Ethereum transactions for a user based on their address.

- **Endpoint:** `GET /api/transactions/:address`
- **Parameters:**
  - `address` (string): The Ethereum address of the user.
- **Response:**
  - A list of transactions associated with the provided Ethereum address.

#### Example Request

```http
GET /api/transactions/0xce94e5621a5f7068253c42558c147480f38b5e0d


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

**Endpoint:** `GET /api/expenses/:address`

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

## Implementation

### 1. Create the API Endpoint

Create a route handler for the endpoint that calculates user expenses. This handler will:
- Fetch the user's transactions from the database.
- Calculate the total expenses based on the transaction data.
- Fetch the current price of Ether from the database or an external API.
- Return the calculated total expenses along with the current Ether price.

```javascript
// controllers/expense.controller.js
import { Transaction } from "../models/transaction.model";
import { Price } from "../models/price.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

export const getUserExpenses = asyncHandler(
    async (req, res) => {
        const { address } = req.params;

        try {
            // Fetch the transaction record for the given address
            const transactionRecord = await Transaction.findOne({ address });
            if (!transactionRecord) {
                throw new ApiError(404, "Transaction not found");
            }

            // Calculate the total expenses
            let totalExpenses = 0;
            transactionRecord.transactions.forEach(t => {
                const gasUsed = parseInt(t.gasUsed, 10);
                const gasPrice = parseInt(t.gasPrice, 10);
                totalExpenses += (gasUsed * gasPrice) / 1e18;
            });

            // Fetch the latest Ethereum price from the database
            const currentPriceRecord = await Price.findOne({ currency: 'INR' }).sort({ timestamp: -1 });
            if (!currentPriceRecord) {
                throw new ApiError(404, "Ethereum price not found in database");
            }

            // Return the response
            return res.status(200).json(
                new ApiResponse(200, {
                    totalExpenses,
                    currentEtherPrice: currentPriceRecord.price,
                },
                `Total Expenses: ${totalExpenses}`)
            );
        } catch (error) {
            console.error('Error fetching user expenses:', error);
            return res.status(500).json(new ApiError(500, "An error occurred while calculating user expenses"));
        }
    }
);
```
