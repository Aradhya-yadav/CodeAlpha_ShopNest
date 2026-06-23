const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

/* =========================
Generate JWT
========================= */

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

/* =========================
Register User
========================= */

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    const userExists =
      await User.findOne({
        email:
          email.toLowerCase(),
      });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email:
          email.toLowerCase(),
        password:
          hashedPassword,
      });

    /* Welcome Email */

    try {
      const otp = Math.floor(
        100000 +
          Math.random() * 900000
      );

      const message = `
        <h2>Welcome to ShopNest, ${name}!</h2>
        <p>Thank you for creating your account.</p>
        <p>Your welcome OTP:
        <strong>${otp}</strong></p>
      `;

      await sendEmail({
        email: user.email,
        subject:
          "Welcome to ShopNest",
        message,
      });
    } catch (emailError) {
      console.log(
        "Email Error:",
        emailError.message
      );
    }

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token:
        generateToken(
          user._id
        ),
    });
  } catch (error) {
    console.log(
      "REGISTER ERROR =>",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* =========================
Login User
========================= */

const loginUser = async (
  req,
  res
) => {
  try {
    console.log(
      "LOGIN API HIT"
    );
    console.log(
      "BODY =>",
      req.body
    );

    const {
      email,
      password,
    } = req.body;

    const user =
      await User.findOne({
        email:
          email.toLowerCase(),
      }).select("+password");

    console.log(
      "USER =>",
      user
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "User not found",
      });
    }

    console.log(
      "DB PASSWORD =>",
      user.password
    );

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    console.log(
      "MATCH =>",
      isMatch
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid email or password",
      });
    }

    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token:
        generateToken(
          user._id
        ),
    });
  } catch (error) {
    console.log(
      "LOGIN ERROR =>",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

/* =========================
Get All Users (Admin)
========================= */

const getUsers = async (
  req,
  res
) => {
  try {
    const users =
      await User.find({})
        .select("-password")
        .sort({
          createdAt: -1,
        });

    res.json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};