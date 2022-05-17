const router = require("express").Router();
const loginController = require("../controllers/loginController");

router.post("/", loginController.login);

module.exports = router;
