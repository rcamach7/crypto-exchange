const jwt = require("jsonwebtoken");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

exports.login = [
  // Data Validation and sanitation.
  check("username")
    .exists()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters")
    .toLowerCase(),
  check("password")
    .exists()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
  // Check results of validation
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors });
    }
    // If no errors, move on to step.
    next();
  },
  // Authenticate user with passport.
  passport.authenticate("local", { session: false }),
  // Process authenticated and create token for them
  (req, res, next) => {
    const token = jwt.sign(
      { username: req.user.username, _id: req.user._id },
      process.env.SECRET_STRING
    );
    // Send user token.
    res.json({ token });
  },
];
