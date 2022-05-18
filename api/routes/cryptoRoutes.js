const router = require("express").Router();
const cryptoController = require("../controllers/cryptoController");

// Get all default cryptos
router.get("/", cryptoController.getCryptos);

// Update a single crypto and return it.
router.put("/:name", cryptoController.updateCrypto);

module.exports = router;
