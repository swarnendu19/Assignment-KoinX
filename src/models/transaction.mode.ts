import mongoose from "mongoose";

//Here, I have defined a Transaction schema and model
const transactionSchema = new mongoose.Schema({
    address: String,
    transactions: Array,
  });

export const Transaction = mongoose.model("Transaction", transactionSchema);

