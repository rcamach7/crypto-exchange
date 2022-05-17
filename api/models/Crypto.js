const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Crypto = new Schema({
  ticker: { type: String, required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  history: [
    {
      date: { type: Date, required: true },
      price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Crypto", Crypto);
