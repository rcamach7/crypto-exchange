const { verifyTokenAndStoreCredentials } = require("../assets/middleware");
const { updateCryptos } = require("../assets/api");
const Crypto = require("../models/Crypto");

exports.getCryptos = [
  verifyTokenAndStoreCredentials,
  // Find out if we need to refresh our crypto information (we only refresh after one 30 minutes)
  async (req, res, next) => {
    try {
      // All crypto objects will have the same lastUpdated value. We update them together.
      const cryptos = await Crypto.find();

      // Create a collection of cryptos that have gone too long without being updated.
      const cryptosToUpdate = [];
      cryptos.forEach((crypto) => {
        const minutesElapsed =
          (new Date() - new Date(crypto.lastUpdated)) / 1000 / 60;

        if (minutesElapsed > 30) {
          cryptosToUpdate.push(crypto.name);
        }
      });

      // Update cryptos who haven't been updated in longer than 30 minutes.
      if (cryptosToUpdate.length) {
        try {
          console.log("updating cryptos");
          await updateCryptos(cryptosToUpdate);
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
