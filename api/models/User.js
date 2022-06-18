const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  username: { type: String, required: true, minlength: 4 },
  password: { type: String, required: true, minlength: 4 },
  fullName: { type: String, required: true, minlength: 4 },
  profilePicture: { type: String, required: true },
  balance: { type: Number, required: true, default: 0 },
  deposits: [
    {
      date: { type: Date, required: true },
      amount: { type: Number, required: true },
    },
  ],
  portfolio: [
    {
      crypto: { type: String, require: true },
      quantity: { type: Number, required: true, default: 0 },
      principle: { type: Number, required: true },
      transactions: [
        {
          quantity: { type: Number, required: true },
          purchasePrice: { type: Number, required: true },
        },
      ],
    },
  ],
  bookmarks: [{ name: { type: String, required: true } }],
});

module.exports = mongoose.model("User", User);
