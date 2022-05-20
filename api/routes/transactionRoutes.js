const router = require("express").Router();
const transactionController = require("../controllers/transactionController");

// Will attempt to purchase at real time price, if user has enough of a balance.
router.post("/buy/:name&:quantity", transactionController.buyCryptos);

// Will handle selling of a specific crypto
router.post("/sell/:name&:quantity", transactionController.sellCryptos);

module.exports = router;
