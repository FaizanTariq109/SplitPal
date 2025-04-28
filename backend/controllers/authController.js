const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || password !== user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // we'll add this in your .env

exports.googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body; // frontend will send Google tokenId

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      // If user doesn't exist, create new user with random password
      user = new User({
        name,
        email,
        password: Math.random().toString(36).slice(-8), // Random password
      });
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      message: "Google login successful",
      token,
      user: {
        id: user._id,
        username: user.username || user.name,
        email: user.email,
        picture: picture, // Google profile picture
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Google Login failed", error: err.message });
  }
};
