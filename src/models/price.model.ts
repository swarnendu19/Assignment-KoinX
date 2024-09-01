import mongoose from "mongoose";

//Here I have defined a Price schema and model
const priceSchema = new mongoose.Schema({
  currency: {
      type: String,
      required: true,
  },
  price: {
      type: Number,
      required: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});

export const Price = mongoose.model("Price", priceSchema);

