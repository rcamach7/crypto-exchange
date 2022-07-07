const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const NewsArticle = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  creator: { type: Array, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  pubDate: { type: Date, required: true },
  image_url: { type: String, required: true },
  dateAdded: { type: Date, required: true },
});

module.exports = model("NewsArticle", NewsArticle);
