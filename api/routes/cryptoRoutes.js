const router = require("express").Router();
const cryptoController = require("../controllers/cryptoController");

// Get all default cryptos
router.get("/", cryptoController.getCryptos);

// Update a single crypto and return it.
router.get("/:name", cryptoController.updateCrypto);

module.exports = router;
