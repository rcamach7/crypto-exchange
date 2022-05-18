const { verifyTokenAndStoreCredentials } = require("../assets/middleware");
const { updateCryptos } = require("../assets/api");
const Crypto = require("../models/Crypto");

exports.getCryptos = [
  verifyTokenAndStoreCredentials,
  // Find out if we need to refresh our crypto information (we only refresh after one 30 minutes)
  async (req, res, next) => {
    try {
      // All crypto objects will have the same lastUpdated value. We update them together.
      const bitcoin = await Crypto.findOne({ name: "bitcoin" });
      const minutesElapsed =
        (new Date() - new Date(bitcoin.lastUpdated)) / 1000 / 60;

      if (minutesElapsed > 30) {
        try {
          await updateCryptos();
        } catch (error) {
          res.json({ message: "Error updating crypto information" }, error);
        }
      }

      next();
    } catch (error) {
      res.json({
        message: "Error populating cryptos",
        error,
      });
    }
  },
  // Return cryptos
  async (req, res, next) => {
    try {
      const cryptos = await Crypto.find();
      res.json({ cryptos });
    } catch (error) {
      res.json({
        message: "Error retrieving cryptos",
        error,
      });
    }
  },
];
