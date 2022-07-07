const NewsArticle = require("../models/NewsArticle");
const { getNewsArticles } = require("../assets/api");

exports.getNews = [
  async (req, res, next) => {
    try {
      const articles = await NewsArticle.find();

      if (articles.length === 0) {
        const newArticles = await getNewsArticles();
        console.log(newArticles);

        newArticles.forEach(async (data) => {
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

        return res.json({ message: "News articles added" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Error retrieving news articles" });
    }
  },
];
