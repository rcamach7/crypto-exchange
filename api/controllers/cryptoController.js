const { updateCryptos, updateOneCrypto } = require("../services/cryptoService");
const Crypto = require("../models/Crypto");

exports.getCryptos = [
  // Find out if we need to refresh our crypto information (we only refresh after one 30 minutes)
  async (req, res, next) => {
    try {
      const cryptos = await Crypto.find();

      // Create a collection of cryptos that have gone too long without being updated.
      const cryptosToUpdate = [];
      cryptos.forEach((crypto) => {
        const minutesElapsed =
          (new Date() - new Date(crypto.lastUpdated)) / 1000 / 60;

        if (minutesElapsed >= 15) {
          cryptosToUpdate.push(crypto.name);
        }
      });

      // Update cryptos who haven't been updated in longer than 15 minutes.
      if (cryptosToUpdate.length) {
        try {
          await updateCryptos(cryptosToUpdate);
        } catch (error) {
          res.json(
            { message: "Error performing automatic updates on cryptos" },
            error
          );
        }
      }

      next();
    } catch (error) {
      res.json({
        message: "Error retrieving cryptos from database",
        error,
      });
    }
  },
  // Return cryptos
  async (req, res) => {
    try {
      const cryptos = await Crypto.find();
      res.json({ cryptos });
    } catch (error) {
      res.json({
        message: "Error retrieving cryptos from database",
        error,
      });
    }
  },
];

exports.updateCrypto = [
  async (req, res, next) => {
    const cryptoName = req.params.name;
    if (typeof cryptoName === undefined)
      return res.status(400).json({ message: "Crypto name not provided" });

    try {
      // Will return updated information on the crypto requested, AND update our database as well.
      const updatedCrypto = await updateOneCrypto(cryptoName);
      return res.json({
        message: "Crypto information updated",
        crypto: updatedCrypto,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
];
