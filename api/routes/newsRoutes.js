const router = require("express").Router();
const newsController = require("../controllers/newsController");

router.get("/", newsController.getNews);

module.exports = router;
