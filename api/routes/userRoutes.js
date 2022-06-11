const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser);

router.get("/", userController.getUser);

router.put("/", userController.updateUser);

router.put("/bookmark/:name", userController.updateBookmarked);

module.exports = router;
