const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
const Crypto = require("../models/Crypto");
const NewsArticle = require("../models/NewsArticle");
const axios = require("axios");

exports.updateCryptos = async (cryptos) => {
  try {
    const { data } = await CoinGeckoClient.coins.all({
      order: CoinGecko.ORDER.MARKET_CAP_DESC,
    });

    const tickerMap = new Map();
    for (let index = 0; index < data.length; index++) {
      tickerMap.set(data[index].id, {
        price: data[index].market_data.current_price.usd,
        marketHistory: {
          priceChangePercentage24h:
            data[index].market_data.price_change_percentage_24h,
          priceChangePercentage7d:
            data[index].market_data.price_change_percentage_7d,
          priceChangePercentage14d:
            data[index].market_data.price_change_percentage_14d,
        },
      });
    }

    cryptos.forEach(async (cryptoName) => {
      const data = tickerMap.get(cryptoName);
      if (data === undefined) return;

      await Crypto.findOneAndUpdate(
        { name: cryptoName },
        {
          price: data.price,
          lastUpdated: new Date(),
          marketHistory: data.marketHistory,
        }
      );
    });

    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.updateOneCrypto = async (cryptoName) => {
  try {
    let {
      data: {
        market_data: {
          current_price,
          price_change_percentage_24h,
          price_change_percentage_7d,
          price_change_percentage_14d,
        },
      },
    } = await CoinGeckoClient.coins.fetch(cryptoName, {
      developer_data: false,
      localization: false,
      sparkline: false,
      community_data: false,
    });

    const result = await Crypto.findOneAndUpdate(
      { name: cryptoName },
      {
        price: current_price.usd,
        lastUpdated: new Date(),
        marketHistory: {
          priceChangePercentage24h: price_change_percentage_24h,
          priceChangePercentage7d: price_change_percentage_7d,
          priceChangePercentage14d: price_change_percentage_14d,
        },
      },
      { new: true }
    );

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};

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
