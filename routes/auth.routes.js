const { Router } = require("express");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = Router();

// /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const candidate = await User.findOne();

    if (candidate) {
      return res
        .status(400)
        .json({ message: "User already exist. Please login" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "6h",
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in register" });
  }
});

// /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect email or password" });
    }

    const token = jwt.sign({ userId: user.id }, config.get("jwtSecret"), {
      expiresIn: "6h",
    });

    res.json({ token, userId: user.id });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong in login" });
  }
});

module.exports = router;
