import { User } from "../models/userModel.js";
import { Meeting } from "../models/meetingModel.js";
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

// const getUserHistory = async (req, res) => {
//     const { token } = req.query;

//     try {
//         const user = await User.findOne({ token: token });
//         const meetings = await Meeting.find({ user_id: user.username })
//         res.json(meetings)
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }


const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const meetings = await Meeting.find({ user_id: user.username })
      .sort({ date: -1 });

    return res.json(meetings);

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};


// const addToHistory = async (req, res) => {
//     const { token, meeting_code } = req.body;

//     try {
//         const user = await User.findOne({ token: token });

//         const newMeeting = new Meeting({
//             user_id: user.username,
//             meetingCode: meeting_code
//         })

//         await newMeeting.save();

//         res.status(httpStatus.CREATED).json({ message: "Added code to history" })
//     } catch (e) {
//         res.json({ message: `Something went wrong ${e}` })
//     }
// }

const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  if (!token || !meeting_code) {
    return res.status(400).json({
      success: false,
      message: "Token or meeting code missing"
    });
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token"
      });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code
    });

    await newMeeting.save();

    console.log("Meeting saved:", newMeeting);

    return res.status(201).json({
      success: true,
      message: "Meeting added to history"
    });

  } catch (error) {
    console.error("Error saving meeting:", error);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};



export { login, register, getUserHistory, addToHistory }