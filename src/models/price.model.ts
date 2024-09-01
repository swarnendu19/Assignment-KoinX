import mongoose from "mongoose";

//Here I have defined a Price schema and model
const priceSchema = new mongoose.Schema({
    currency: String,
    price: Number,
    timestamp: { type: Date, default: Date.now },
  });

export const Price = mongoose.model("Price", priceSchema);

