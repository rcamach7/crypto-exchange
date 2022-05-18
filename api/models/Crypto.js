const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Crypto = new Schema({
  name: { type: String, required: true },
  ticker: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  lastUpdated: { type: Date, required: true },
  marketHistory: {
    priceChangePercentage24h: { type: Number, required: true },
    priceChangePercentage7d: { type: Number, required: true },
    priceChangePercentage14d: { type: Number, required: true },
  },
});

module.exports = mongoose.model("Crypto", Crypto);
