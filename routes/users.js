const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DB = process.env.DB;
const validateRegisterInput = require("../Validation/register");
const validateLoginInput = require("../Validation/login");
const User = require("../models/User");

// @route POST users/login
// @desc Register user and return JWT token
// @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check if all fields are valid
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if email is registered
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res
        .status(400)
        .json({ email: `${req.body.email} is already taken` });
    } else {
        const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dob: new Date(req.body.dob).toISOString(),
        gender: req.body.gender
      });

      // Hash password to store in DB
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST /users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const pw = req.body.password;

  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailNotFound: "Email not found" });
    }

    // Check password
    bcrypt.compare(pw, user.password).then((isMatch) => {
      if (isMatch) {
        // Create JWT payload if match
        const payload = {
          id: user.id,
          name: user.name,
        };

        // Sign token
        jwt.sign(payload, "secret", { expiresIn: 31556926 }, (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordIncorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
