const Crypto = require("../models/Crypto");
const GeckoAPI = require("./CoinGeckoClient");

exports.updateCryptos = async (cryptos) => {
  try {
    const GeckoAPIClient = new GeckoAPI();
    const data = await GeckoAPIClient.getAllCoins();

    const tickerMap = new Map();
    for (let index = 0; index < data.length; index++) {
      tickerMap.set(data[index].id, {
        price: data[index].current_price,
        marketHistory: {
          priceChangePercentage24h:
            data[index].price_change_percentage_24h_in_currency,
          priceChangePercentage7d:
            data[index].price_change_percentage_7d_in_currency,
          priceChangePercentage14d:
            data[index].price_change_percentage_14d_in_currency,
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
    const GeckoAPIClient = new GeckoAPI();
    const data = await GeckoAPIClient.getOneCoin(cryptoName);

    const result = await Crypto.findOneAndUpdate(
      { name: cryptoName },
      {
        price: data.current_price,
        lastUpdated: new Date(),
        marketHistory: {
          priceChangePercentage24h: data.priceChangePercentage24h,
          priceChangePercentage7d: data.priceChangePercentage7d,
          priceChangePercentage14d: data.priceChangePercentage14d,
        },
      },
      { new: true }
    );

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
};
