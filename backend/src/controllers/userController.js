
import { User } from "../models/userModel.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

// REGISTER
const register = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: "Missing details" });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ success: false, message: "User already exists" });
    }

    if (password.length < 8) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ success: false, message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    return res
      .status(httpStatus.CREATED)
      .json({ success: true, message: "User registered successfully" });

  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: `Something went wrong: ${error.message}` });
  }
};

//  LOGIN
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json({ success: false, message: "Missing details" });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ success: false, message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Invalid credentials" });
    }

    //Generate a random token using crypto
    const token = crypto.randomBytes(32).toString("hex");

    // Save token in DB 
    user.token = token;
    await user.save();

    return res
      .status(httpStatus.OK)
      .json({ success: true, message: "Login successful", token });

  } catch (error) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: `Something went wrong: ${error.message}` });
  }
};
