const Crypto = require("../models/Crypto");
const GeckoAPI = require("./CoinGeckoClient");

exports.updateCryptos = async (cryptos) => {
  try {
    const GeckoAPIClient = new GeckoAPI();
    const coins = await GeckoAPIClient.getAllCoins();

    cryptos.forEach(async (cryptoName) => {
      const coinData = coins.get(cryptoName);
      if (coinData === undefined) return;

      await Crypto.findOneAndUpdate(
        { name: cryptoName },
        {
          price: coinData.price,
          lastUpdated: new Date(),
          marketHistory: coinData.marketHistory,
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
