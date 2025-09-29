const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET =
  process.env.JWT_SECRET || "fallback-secret-key-for-development";

// Create user
router.post(
  "/createuser",
  [
    body("name")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("role")
      .optional()
      .isIn(["user", "admin"])
      .withMessage("Role must be either user or admin"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success,
        error: errors.array()[0].msg,
        details: errors.array(),
      });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "User with this email already exists",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        roles: [req.body.role || "user"],
      });

      const data = { user: { id: user.id, roles: user.roles } };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({
        success,
        authToken,
        roles: user.roles,
        message: "Account created successfully!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
        },
      });
    } catch (err) {
      console.error("Registration error:", err.message);
      res.status(500).json({
        success: false,
        error: "Internal Server Error. Please try again.",
      });
    }
  }
);

// Login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").exists().withMessage("Password is required"),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success,
        error: errors.array()[0].msg,
        details: errors.array(),
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success,
          error: "Invalid email or password",
        });
      }

      const passComp = await bcrypt.compare(password, user.password);
      if (!passComp) {
        return res.status(400).json({
          success,
          error: "Invalid email or password",
        });
      }

      const data = { user: { id: user.id, roles: user.roles } };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;

      res.json({
        success,
        authToken,
        roles: user.roles,
        message: "Login successful!",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: user.roles,
        },
      });
    } catch (err) {
      console.error("Login error:", err.message);
      res.status(500).json({
        success: false,
        error: "Internal Server Error. Please try again.",
      });
    }
  }
);

module.exports = router;
