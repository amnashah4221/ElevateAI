import UserModel from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';

// ==================== REGISTER ====================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be 8+ characters, include uppercase, number & special character"
      });
    }

    // Check if user exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create user
    const user = await UserModel.create({ name, email, password , role});

    if (user) {
      // Generate tokens
      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id);

      // Set refresh token cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Send response with accessToken
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
      });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== LOGIN ====================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await UserModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      // Generate tokens
      const accessToken = generateAccessToken(user._id, user.role);
      const refreshToken = generateRefreshToken(user._id);

      // Set refresh token cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      // Send response with accessToken
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateAccessToken(user._id, user.role)
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== REFRESH TOKEN ====================
const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) return res.status(401).json({ message: 'No refresh token provided' });

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const user = await UserModel.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    const accessToken = generateAccessToken(user._id, user.role);

    res.json({ accessToken });

  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

export { registerUser, loginUser, refreshToken };
