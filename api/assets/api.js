const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
const Crypto = require("../models/Crypto");

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

const fetchOne = async () => {
  try {
    let {
      data: {
        id,
        symbol,
        description,
        image,
        market_data: {
          current_price,
          price_change_percentage_24h,
          price_change_percentage_7d,
          price_change_percentage_14d,
        },
      },
    } = await CoinGeckoClient.coins.fetch("bitcoin", {
      developer_data: false,
      localization: false,
      sparkline: false,
      community_data: false,
    });
    console.log({
      id,
      symbol,
      description,
      image,
      current_price,
      price_change_percentage_7d,
      price_change_percentage_14d,
      price_change_percentage_24h,
    });
  } catch (error) {
    console.log(error);
  }
};
