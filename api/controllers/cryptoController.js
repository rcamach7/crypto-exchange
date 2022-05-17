const { verifyTokenAndStoreCredentials } = require("../assets/middleware");

exports.getCryptos = [
  verifyTokenAndStoreCredentials,
  (req, res, next) => {
    res.json({ msg: "Hello World" });
  },
];
