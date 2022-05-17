const router = require("express").Router();
const cryptoController = require("../controllers/cryptoController");

router.get("/", cryptoController.getCryptos);

module.exports = router;
