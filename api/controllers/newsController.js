const NewsArticle = require("../models/NewsArticle");
const { replaceNewsArticles } = require("../services/newsService");

exports.getNews = [
  // Check to see if X time has elapsed, for us to refresh out news articles from a 3P API.
  async (req, res, next) => {
    try {
      const article = await NewsArticle.findOne();

      const minutesElapsed = article
        ? (new Date() - new Date(article.dateAdded)) / 1000 / 60
        : null;

      if (!article || minutesElapsed > 15) {
        await replaceNewsArticles();
      }

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Error updating news articles" });
    }
  },
  async (req, res, next) => {
    try {
      const articles = await NewsArticle.find({});

      return res.json({ articles });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Error retrieving news articles" });
    }
  },
];
