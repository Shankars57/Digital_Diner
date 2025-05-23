const userModel = require("../models/userModel.js");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();
const secret_key = process.env.JWT_SECRET;

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields must be entered." });
  }

  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    const existed = await userModel.findOne({ email });
    if (existed) {
      return res.json({ success: false, message: "User already exists." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(String(password), saltRounds);

    const user = new userModel({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, email: user.email }, secret_key, {
      expiresIn: "2d",
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "User successfully registered.",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

const userLogin = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }
    const isMatch = await bcrypt.compare(
      String(req.body.password),
      user.password
    );
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, password: user.password },
      secret_key,
      {
        expiresIn: "2d",
      }
    );
    res.status(200).json({
      success: true,
      message: "User successfully logged in.",
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong" });
  }
};

module.exports = { createUser, userLogin };
