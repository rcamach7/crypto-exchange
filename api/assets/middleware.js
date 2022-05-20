const jwt = require("jsonwebtoken");

exports.verifyTokenAndStoreCredentials = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];

    // If token exists, but is not valid - we will not process request.
    try {
      const { _id } = jwt.verify(bearerToken, process.env.SECRET_STRING);
      res.locals.userId = _id;
    } catch (errors) {
      return res.status(401).json({ message: "Token is not valid.", errors });
    }
    next();
  } else {
    return res.status(403).json({
      message: "Protected route - not authorized",
    });
  }
};

exports.verifyTransactionParameters = function (req, res, next) {
  if (
    req.params.name === undefined ||
    req.params.quantity === undefined ||
    isNaN(Number.parseInt(req.params.quantity))
  ) {
    return res
      .status(400)
      .json({ message: "Please provide correct parameters" });
  } else {
    next();
  }
};
