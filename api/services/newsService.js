const NewsArticle = require("../models/NewsArticle");
const axios = require("axios");

exports.getNewsArticles = async () => {
  try {
    const res = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_TOKEN}&country=us&category=technology&language=en&q=crypto%20OR%20cryptocurrency%20OR%20bitcoin%20OR%20blockchain`
    );

    return Promise.resolve(res.data.results);
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.replaceNewsArticles = async () => {
  try {
    // Remove all previous news articles stored in our database!
    await NewsArticle.deleteMany({});

    // Retrieve new news articles
    const res = await axios.get(
      `https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_TOKEN}&country=us&category=technology&language=en&q=crypto%20OR%20cryptocurrency%20OR%20bitcoin%20OR%20blockchain`
    );

    // Save all retrieved articles to our database.
    res.data.results.forEach(async (data) => {
      const article = new NewsArticle({
        title: data.title ? data.title : "No title available...",
        link: data.link
          ? data.link
          : "https://rcamach7.github.io/crypto-exchange/#/crypto-exchange/",
        creator: data.creator ? data.creator : ["Anonymous"],
        description: data.description
          ? data.description
          : "No description available...",
        content: data.content ? data.content : "No content available...",
        pubDate: data.pubDate ? data.pubDate : new Date(),
        image_url: data.image_url
          ? data.image_url
          : "https://res.cloudinary.com/de2ymful4/image/upload/v1657237129/crypto-exchange/assets/stock_crypto_empbv9.png",
        dateAdded: new Date(),
      });
      await article.save();
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};
