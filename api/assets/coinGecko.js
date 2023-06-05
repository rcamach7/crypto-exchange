const axios = require("axios");

class GeckoAPI {
  constructor() {
    this.url = "https://api.coingecko.com/api/v3";
  }

  async getOneCoin(cryptoName) {
    const path = `/coins/${cryptoName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    try {
      const res = await axios.get(this.url + path);
      return Promise.resolve({
        id: res.data.id,
        current_price: res.data.market_data.current_price.usd,
        priceChangePercentage24h:
          res.data.market_data.price_change_percentage_24h,
        priceChangePercentage7d:
          res.data.market_data.price_change_percentage_7d,
        priceChangePercentage14d:
          res.data.market_data.price_change_percentage_14d,
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }

  async getAllCoins() {
    const path =
      "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h%2C7d%2C14d%2C&locale=en";
    try {
      const res = await axios.get(`${this.url + path}`);
      return Promise.resolve(res.data);
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  }
}

module.exports = GeckoAPI;
