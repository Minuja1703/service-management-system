const User = require("../models/userModel");
const ProviderProfile = require("../models/providerProfileModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

const signup = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      phone,
      serviceOfferedId,
      price,
      experienceYears,
      serviceAreas,
    } = req.body;

    if (!name || !email || !password || !phone || !role) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (role === "provider") {
      if (!serviceOfferedId || !price || !experienceYears || !serviceAreas) {
        return res.status(400).json({
          message: "All fields are required.",
        });
      }
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    await newUser.save();

    if (role === "provider") {
      const newProviderProfile = new ProviderProfile({
        userId: newUser._id,
        serviceOfferedId,
        price,
        experienceYears,
        serviceAreas,
      });

      await newProviderProfile.save();
    }

    res.status(201).json({
      message:
        role === "provider"
          ? "Provider created successfully."
          : "User created successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    const userExists = await User.findOne({ email });

    if (!userExists) {
      return res.status(401).json({
        message: "Incorrect Credentials.",
      });
    }

    // if (userExists.role !== role) {
    //   return res.status(403).json({
    //     message: "Incorrect Credentials.",
    //   });
    // }

    const passwordMatch = await bcrypt.compare(password, userExists.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect Credentials.",
      });
    }

    if (!userExists.isActive) {
      return res.status(403).json({
        message: "Your account has be suspended.",
      });
    }

    if (userExists.role === "provider" && !userExists.isVerified) {
      return res.status(403).json({
        message: "Your account is pending Admin approval.",
      });
    }

    const token = generateToken(userExists);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
    });

    return res.status(200).json({
      message: "Login Successfull.",
      user: {
        role: userExists.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.cookie("token", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      message: "Logout successful.",
    });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login, logout, getMe };
