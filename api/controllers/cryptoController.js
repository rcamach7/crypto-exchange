const { verifyTokenAndStoreCredentials } = require("../assets/middleware");
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();

exports.getCryptos = [
  verifyTokenAndStoreCredentials,
  async (req, res, next) => {
    res.json({ msg: "Hello World" });
  },
];
