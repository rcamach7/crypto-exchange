const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

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
fetchOne();
