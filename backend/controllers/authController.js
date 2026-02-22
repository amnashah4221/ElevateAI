import UserModel from "../models/User.model.js";
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';


const isProduction = process.env.NODE_ENV === "production";

const refreshCookieOptions = {
  httpOnly: true,
  secure: isProduction,                // production me true
  sameSite: isProduction ? "none" : "lax",  // 🔥 IMPORTANT FIX
  maxAge: 7 * 24 * 60 * 60 * 1000
};

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
      res.cookie('refreshToken', refreshToken, refreshCookieOptions);

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
      res.cookie('refreshToken', refreshToken, refreshCookieOptions);

      // Send response with accessToken
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken
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

// ==================== UPDATE ROLES ====================


const updateRoles = async (req, res)=>{
  try{
    const user = await UserModel.findByIdAndUpdate(
      req.user.id, 
      {$set: {targetRoles: req.body.targetRoles}},
      {new: true}
    );
    res.status(200).json(user);
  }
  catch(error){
    res.status(500).json({message: "Server Error"})
  }
}

// ==================== GET ROLES ====================

const getRoles = async (req, res)=>{
  try{
    const user = await UserModel
    .findById(req.user.id)
    .select('targetRoles');
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({targetRoles: user.targetRoles});
  }
  catch(error){
    res.status(500).json({message: "Server Error"})
  }
}

// ==================== GET PROFILE ====================

const getprofile = async (req, res)=>{
  try{
    const user = await UserModel
    .findById(req.user.id)
    .select('bio createdAt updatedAt name targetRoles profilePic experienceLevel');
    if(!user){
      return res.status(404).json({message:"User not found"})
    }
    res.status(200).json({targetRoles: user.targetRoles, bio: user.bio, 
      name: user.name, createdAt:user.createdAt, updatedAt: user.updatedAt,
      profilePic: user.profilePic, experienceLevel: user.experienceLevel
    });
  }
  catch(error){
    res.status(500).json({message: "Server Error"})
  }
}


// ==================== UPDATE PROFILE ====================


const updateProfile = async (req, res)=>{
  try{
     const updateData = {
      name: req.body.name,
      bio: req.body.bio,
      experienceLevel: req.body.experienceLevel,
      targetRoles: req.body.targetRoles
    };

     if (req.body.profilePic) {
      updateData.profilePic = req.body.profilePic;
    }

     const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(user);
  }
  catch(error){
    res.status(500).json({message: "Server Error"})
  }
}


const getexperiencelevel = (req, res) =>{

  try{
    const levels = UserModel.schema.path("experienceLevel").enumValues;
    res.status(200).json({levels});
  }

  catch(error){
    res.status(500).json({message: "Server Error"})
  }
}

const updatepassword = async (req, res)=>{
  try{
    const {currentPassword, newPassword} = req.body;
    const user = await UserModel.findById(req.user.id);
    if(!user){
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(currentPassword);
    if(!isMatch){
      return res.status(400).json({ message: "Old Password is wrong" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully!" });
  }
  catch(error){
     res.status(500).json({message: "Server Error"})
  }
}


const deleteAccount = async (req, res)=>{
  try{
    const user = await UserModel.findByIdAndDelete(req.user.id);

    if(!user){
      return res.status(404).json({message: "USer not found"});
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    })

    res.status(200).json({message:"Account deleted successfully"})
  }
  catch(error){
    res.status(500).json({ message: "Server Error", error: error.message });
  }
}
export { registerUser, loginUser, refreshToken, updateRoles, getRoles, getprofile, updateProfile, getexperiencelevel, updatepassword, deleteAccount };
