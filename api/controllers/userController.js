const { check, validationResult } = require("express-validator");
const middleware = require("../assets/middleware");
const axios = require("axios");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary and set some settings.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "crypto-exchange/profilePictures",
  },
});
const upload = multer({ storage });

exports.createUser = [
  // Data Validation and sanitation.
  check("username")
    .exists()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Username must be at least 4 characters")
    .toLowerCase()
    // Makes sure the username is not already in use by another member
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        return Promise.reject("Username already exists");
      }
    }),
  check("password")
    .exists()
    .trim()
    .isLength({ min: 4 })
    .withMessage("Password must be at least 4 characters"),
  check("fullName")
    .exists()
    .trim()
    .isLength({ min: 4 })
    .withMessage("fullName must be at least 4 characters")
    .toLowerCase(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors);
    }
    // If no errors, move on to step.
    next();
  },
  async (req, res, next) => {
    try {
      // Hash password provided by user
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const user = new User({
        username: req.body.username,
        fullName: req.body.fullName,
        profilePicture:
          "https://res.cloudinary.com/de2ymful4/image/upload/v1654559614/crypto-exchange/assets/stock_ehxcl9_idaplu.png",
        password: hashedPassword,
        balance: 1000000,
        deposits: [{ date: new Date(), amount: 1000000 }],
        bookmarks: [],
        wallet: [],
      });
      // Save new user, and update my admin account to reflect new friend as well.
      await user.save();

      // Save user in order to provide login details to our endpoint to retrieve authentication token.
      res.locals.user = {
        username: user.username,
        password: req.body.password,
      };
      next();
    } catch (errors) {
      console.log(errors);
      return res
        .status(400)
        .json({ message: "Error creating new account", errors });
    }
  },
  // Make request to our login endpoint to retrieve and send back authentication token.
  async (req, res) => {
    try {
      // Use our login endpoint to send user back a authentication token.
      const {
        data: { token },
      } = await axios.post(
        `${process.env.API_SERVER_URL}/login`,
        res.locals.user
      );

      return res.json({ token });
    } catch (errors) {
      return res
        .status(400)
        .json({ message: "Error retrieving authentication token", errors });
    }
  },
];

exports.getUser = [
  // Verify token exists - if so, pull and save user id in res.locals.userId for next middleware.
  middleware.verifyTokenAndStoreCredentials,
  // Verify token is valid, and retrieve user.
  async (req, res) => {
    try {
      const user = await User.findById(res.locals.userId).select("-password");

      if (user == null) {
        return res
          .status(401)
          .json({ message: "Invalid token, no user exists with this token" });
      } else {
        return res.json({ user });
      }
    } catch (errors) {
      return res
        .status(401)
        .json({ message: "Error getting user information", errors });
    }
  },
];

// Allows user to update their fullName, or profilePicture
exports.updateUser = [
  // Verify token exists - if so, pull and save user id in res.locals.userId for next middleware.
  middleware.verifyTokenAndStoreCredentials,
  // Process multi part form data and upload image is it exists
  upload.single("profilePicture"),
  async (req, res, next) => {
    try {
      const currentUser = await User.findById(res.locals.userId);
      const user = await User.findOneAndUpdate(
        { _id: res.locals.userId },
        {
          fullName: req.body.fullName
            ? req.body.fullName
            : currentUser.fullName,
          profilePicture: req.file ? req.file.path : currentUser.profilePicture,
        },
        {
          new: true,
        }
      ).select("-password");

      return res.json({ message: "User has been updated", user });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error occurred while updating user!", error });
    }
  },
];

exports.deleteUser = (req, res, next) => {
  res.json({ msg: "Get User Endpoint" });
};

exports.updateBookmarked = [
  middleware.verifyTokenAndStoreCredentials,
  async (req, res, next) => {
    const cryptoName = req.params.name;
    if (typeof cryptoName === undefined)
      return res.status(400).json({ message: "Crypto name not provided" });

    try {
      const user = await User.findById(res.locals.userId).select("-password");
      const updatedBookmarks = [...user.bookmarks];

      let indexOfBookmark = -1;
      updatedBookmarks.forEach((bookmark, i) => {
        if (bookmark.name === cryptoName) {
          indexOfBookmark = i;
        }
      });

      if (indexOfBookmark > -1) {
        updatedBookmarks.splice(indexOfBookmark, 1);
      } else {
        updatedBookmarks.push({ name: cryptoName });
      }

      const updatedUser = await User.findByIdAndUpdate(
        res.locals.userId,
        {
          bookmarks: updatedBookmarks,
        },
        { new: true }
      ).select("-password");

      return res.json({
        message: "Bookmarked request done",
        user: updatedUser,
      });
    } catch (errors) {
      return res
        .status(500)
        .json({ message: "Error updating bookmarks", errors });
    }
  },
];
